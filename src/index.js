const express = require('express')
const logger = require('./util/logger')

const { PORT, ENV } = require('./util/config')
const { getIAMRights } = require('./auth/IAMRights')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  const { iamGroups = [] } = req.body

  const { access } = getIAMRights(iamGroups)

  logger.info('IAM authentication', { iamGroups, access })

  res.send(access)
})

app.listen(PORT, () => {
  logger.info(`Started on port ${PORT} with environment ${ENV}`)
})
