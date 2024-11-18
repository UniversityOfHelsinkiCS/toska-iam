import * as Sentry from '@sentry/node'
import { nodeProfilingIntegration } from '@sentry/profiling-node'

import { inProduction } from './config'

if (inProduction) {
  Sentry.init({
    dsn: 'https://f67e2aa95d80df2823600b00544bf059@toska.cs.helsinki.fi/11',
    integrations: [nodeProfilingIntegration()],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
  })
}
