import morgan, { TokenIndexer } from 'morgan'
import logger from '../util/logger'
import { Request, Response } from 'express'
import { inProduction } from '../util/config'

const formatFunction = (tokens: TokenIndexer, req: Request, res: Response) => {
  const { uid } = req.headers

  const method = tokens.method(req, res)
  const url = tokens.url(req, res)
  const status = tokens.status(req, res)
  const responseTime = tokens['response-time'](req, res)
  const userAgent = tokens['user-agent'](req, res)

  const message = `${method} ${url} ${status} - ${responseTime} ms`

  const additionalInfo = inProduction
    ? {
        userId: uid,
        method,
        url,
        status,
        responseTime,
        userAgent,
      }
    : {}

  logger.info(message, additionalInfo)

  return null
}

const accessLogger = morgan(formatFunction)

export default accessLogger
