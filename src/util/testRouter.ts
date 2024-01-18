import { Router } from 'express'
import User from '../db/models/user'

const testRouter = Router()

testRouter.post('/users', (req, res) => {
  const users = req.body

  User.bulkCreate(users)

  res.status(201).json(users)
})

export default testRouter
module.exports = testRouter
