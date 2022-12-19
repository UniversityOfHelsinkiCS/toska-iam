const express = require('express')

const { PORT } = require('./util/config')
const logger = require('./util/logger')

const app = express()

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.listen(PORT, () => {
  logger.info(`Started on port ${PORT}`)
})
