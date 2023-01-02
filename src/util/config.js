require('dotenv').config()

const DB_CONFIG = {
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 0,
    acquire: 10000,
    idle: 300000000,
  },
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  logging: false,
}

const PORT = process.env.PORT

const inProduction = process.env.NODE_ENV === 'production'

module.exports = {
  DB_CONFIG,
  PORT,
  inProduction,
}
