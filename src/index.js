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

app.get('/ping', (_req, res) => {
  res.send('pong')
})

app.post('/', (req, res) => {
  const { userId, iamGroups = [] } = req.body

  const relevantIamGroups = iamGroups.filter((iam) =>
    relevantIAMs.includes(iam),
  )

  const { access } = getIAMRights(relevantIamGroups)

  if (userId && iamGroups)
    User.upsert({ id: userId, iamGroups: relevantIamGroups })

  if (Object.keys(access).length !== 0)
    logger.info('IAM authentication', { userId, iamGroups, access })

  res.send(access)
})

app.get('/access-to-all', (_req, res) => {
  const access = {}

  relevantOrganisations.forEach((org) => {
    access[org] = { read: true, write: true, admin: true }
  })

  res.send(access)
})

app.get('/organisation-data', (_req, res) => {
  res.send(data)
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
