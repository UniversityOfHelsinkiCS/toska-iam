const Sentry = require('@sentry/node')
// eslint-disable-next-line no-unused-vars
const Tracing = require('@sentry/tracing')

const { inProduction } = require('./config')

const initializeSentry = () => {
  if (!inProduction) return

  Sentry.init({
    dsn: 'https://f67e2aa95d80df2823600b00544bf059@toska.cs.helsinki.fi/11',
    tracesSampleRate: 1.0,
  })
}

module.exports = initializeSentry
