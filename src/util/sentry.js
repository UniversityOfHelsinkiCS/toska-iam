const Sentry = require('@sentry/node')
const Tracing = require("@sentry/tracing")

const { inProduction } = require('./config')

const initializeSentry = () => {
  // if (!inProduction) return

  Sentry.init({
    dsn: 'https://e3af253db270454ca8eed5a4a8099ade@sentry.cs.helsinki.fi/14',
    tracesSampleRate: 1.0,
  })
}

module.exports = initializeSentry
