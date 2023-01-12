const express = require('express')
const Sentry = require('@sentry/node')

const { PORT, inProduction } = require('./util/config')
const initializeSentry = require('./util/sentry')
const logger = require('./util/logger')

const errorHandler = require('./middleware/errors')
const accessLogger = require('./middleware/access')

const { relevantIAMs, relevantOrganisations } = require('./auth/IAMConfig')
const { getIAMRights } = require('./auth/IAMRights')
const { data } = require('./auth/data')

const { connectToDatabase } = require('./db/connection')
const { User } = require('./db/models')

initializeSentry()

const app = express()

app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler())

app.use(express.json())

if (!inProduction) app.use(accessLogger)

app.get('/ping', (_req, res) => res.send('pong'))

app.post('/', (req, res) => {
  const { userId, iamGroups = [] } = req.body

  const relevantIamGroups = iamGroups.filter((iam) =>
    relevantIAMs.includes(iam),
  )

  const { access, specialGroup } = getIAMRights(relevantIamGroups)

  if (userId && iamGroups)
    User.upsert({ id: userId, iamGroups: relevantIamGroups })

  if (Object.keys(access).length !== 0)
    logger.info('IAM authentication', { userId, iamGroups, access })

  return res.send({ ...access, specialGroup })
})

app.get('/access-to-all', (_req, res) => {
  const access = {}

  relevantOrganisations.forEach((org) => {
    access[org] = { read: true, write: true, admin: true }
  })

  const specialGroup = { allProgrammes: true }

  return res.send({ ...access, specialGroup })
})

app.get('/organisation-data', (_req, res) => res.send(data))

app.get('/all-access', async (_req, res) => {
  const users = await User.findAll()

  const usersWithAccess = users.map(({ dataValues: user }) => ({
    ...user,
    ...getIAMRights(user.iamGroups),
  }))

  return res.send(usersWithAccess)
})

app.get('/:id', async (req, res) => {
  const { id } = req.params

  const user = await User.findByPk(id)

  if (!user) return res.sendStatus(404)

  return res.send(user)
})

app.use(Sentry.Handlers.errorHandler())
app.use(errorHandler)

const start = async () => {
  await connectToDatabase()

  app.listen(PORT, () => {
    logger.info(
      `Started on port ${PORT} with environment ${
        inProduction ? 'production' : 'development'
      }`,
    )
  })
}

start()
