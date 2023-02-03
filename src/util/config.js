require('dotenv').config()

const PORT = process.env.PORT

const inProduction = process.env.NODE_ENV === 'production'

const inStaging = process.env.NODE_ENV === 'staging'

let DB_CONNECTION_STRING = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:5432/${process.env.POSTGRES_DATABASE}?targetServerType=primary`

if (inStaging) DB_CONNECTION_STRING = `${connectionString}&ssl=true`

module.exports = {
  DB_CONNECTION_STRING,
  PORT,
  inProduction,
}
