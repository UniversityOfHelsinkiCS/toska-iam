const { Router } = require('express')
const User = require('../db/models/user')

const testRouter = Router()

testRouter.post('/users', (req, res) => {
  const users = req.body

  User.bulkCreate(users)

  res.status(201).json(users)
})

module.exports = testRouter
