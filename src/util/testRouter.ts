import { Router } from 'express'
import User from '../db/models/user'

const testRouter = Router()

testRouter.post('/users', async (req, res) => {
  const users = req.body

  await User.bulkCreate(users)

  res.status(201).json(users)
})

export default testRouter
