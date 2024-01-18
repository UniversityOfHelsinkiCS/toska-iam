import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT

const inProduction = process.env.NODE_ENV === 'production'

const DATABASE_URL = process.env.DATABASE_URL

export { DATABASE_URL, PORT, inProduction }
