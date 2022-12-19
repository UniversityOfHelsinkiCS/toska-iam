const Sentry = require('@sentry/node')
const logger = require('../util/logger')

const errorHandler = (error, _req, _res, next) => {
  logger.error(`${error.message} ${error.name} ${error.stack}`)

  Sentry.captureException(error)

  return next(error)
}

module.exports = errorHandler
