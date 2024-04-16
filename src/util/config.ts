import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT

export const inProduction = process.env.NODE_ENV === 'production'

export const DATABASE_URL = process.env.DATABASE_URL

export const importerUrl =
  'https://api-toska.apps.ocp-prod-0.k8s.it.helsinki.fi/importer'

export const importerToken = process.env.IMPORTER_DB_API_TOKEN || ''
