const express = require('express')
const Sentry = require('@sentry/node')

const { PORT, inProduction } = require('./util/config')
const initializeSentry = require('./util/sentry')
const logger = require('./util/logger')

const errorHandler = require('./middleware/errors')
const accessLogger = require('./middleware/access')

const { relevantIAMs } = require('./auth/IAMConfig')
const { getIAMRights } = require('./auth/IAMRights')

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
  const { userId, iamGroups = [], noLogging = false } = req.body

  const relevantIamGroups = iamGroups.filter(iam => relevantIAMs.includes(iam))

  const { access } = getIAMRights(relevantIamGroups)

  if (!noLogging && Object.keys(access).length !== 0)
    logger.info('IAM authentication', { userId, iamGroups, access })

  res.send(access)
})

app.use(Sentry.Handlers.errorHandler())
app.use(errorHandler)

app.listen(PORT, () => {
  logger.info(
    `Started on port ${PORT} with environment ${
      inProduction ? 'production' : 'development'
    }`,
  )
})
