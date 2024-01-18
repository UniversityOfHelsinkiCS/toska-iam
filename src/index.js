const express = require('express')
const Sentry = require('@sentry/node')

const { PORT, inProduction } = require('./util/config')
const initializeSentry = require('./util/sentry')
import logger from './util/logger'

const errorHandler = require('./middleware/errors')
const accessLogger = require('./middleware/access')

const {
  relevantIAMs,
  relevantOrganisations,
  iamToFaculty,
} = require('./auth/IAMConfig')
const { getIAMRights } = require('./auth/IAMRights')
const { data } = require('./auth/data')

const { connectToDatabase } = require('./db/connection')
const { User } = require('./db/models')
const testRouter = require('./util/testRouter')

initializeSentry()

const app = express()

app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler())

app.use(express.json())

app.use(accessLogger)

app.get('/ping', (_req, res) => res.send('pong'))

app.post('/', (req, res) => {
  const { userId, iamGroups = [] } = req.body

  const relevantIamGroups = iamGroups.filter((iam) =>
    relevantIAMs.includes(iam),
  )

  const { access, specialGroup } = getIAMRights(relevantIamGroups)

  if (userId && iamGroups) User.upsert({ id: userId, iamGroups })

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

  const usersWithAccess = users.map(({ dataValues: user }) => {
    const iamGroups = user.iamGroups.filter((iam) => relevantIAMs.includes(iam))

    return {
      ...user,
      iamGroups,
      ...getIAMRights(iamGroups),
    }
  })

  return res.send(usersWithAccess)
})

app.get('/iam-groups', async (_req, res) => {
  const users = await User.findAll()

  const iamGroups = users.map(({ iamGroups }) => iamGroups).flat()

  const uniqueIamGroups = [...new Set(iamGroups)]

  return res.send(uniqueIamGroups)
})

app.post('/user-organisations', async (req, res) => {
  const { userId, iamGroups = [] } = req.body

  if (userId && iamGroups) User.upsert({ id: userId, iamGroups })

  const faculties = {}
  iamGroups.forEach((iam) => {
    const faculty = iamToFaculty(iam)
    if (faculty) faculties[faculty.code] = faculty
  })

  return res.send(Object.values(faculties))
})

app.get('/:id', async (req, res) => {
  const { id } = req.params

  const user = await User.findByPk(id)

  if (!user) return res.sendStatus(404)

  const iamGroups = user.iamGroups.filter((iam) => relevantIAMs.includes(iam))

  return res.send({
    ...user.dataValues,
    iamGroups,
  })
})

if (!inProduction) {
  app.use(testRouter)
}

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
