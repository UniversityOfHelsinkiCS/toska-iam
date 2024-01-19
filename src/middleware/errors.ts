import * as Sentry from '@sentry/node'
import logger from '../util/logger'
import { ErrorRequestHandler } from 'express'

const errorHandler: ErrorRequestHandler = (error, _req, _res, next) => {
  logger.error(`${error.message} ${error.name} ${error.stack}`)

  Sentry.captureException(error)

  return next(error)
}

module.exports = errorHandler
export default errorHandler
