require('dotenv').config()

const PORT = process.env.PORT
const ENV = process.env.NODE_ENV

module.exports = {
  PORT,
  ENV,
}
