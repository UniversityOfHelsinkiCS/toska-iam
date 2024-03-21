import * as Sentry from '@sentry/node'
import '@sentry/tracing'
import { inProduction } from './config'

export const initializeSentry = () => {
  if (!inProduction) return

  Sentry.init({
    dsn: 'https://f67e2aa95d80df2823600b00544bf059@toska.cs.helsinki.fi/11',
    tracesSampleRate: 1.0,
  })
}
