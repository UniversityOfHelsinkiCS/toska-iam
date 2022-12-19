const express = require('express')
const Sentry = require('@sentry/node')

const { PORT, inProduction } = require('./util/config')
const initializeSentry = require('./util/sentry')
const logger = require('./util/logger')
const { getIAMRights } = require('./auth/IAMRights')

const errorHandler = require('./middleware/errors')
const accessLogger = require('./middleware/access')

initializeSentry()

const app = express()

app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler())

app.use(express.json())

if (!inProduction) app.use(accessLogger)

app.get('/', (_req, res) => {
  res.send('pong')
})

app.post('/', (req, res) => {
  const { userId, iamGroups = [] } = req.body

  const { access } = getIAMRights(iamGroups)

  if (Object.keys(access).length !== 0)
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
