import { Client, Account, Functions, Storage, Databases, Teams } from 'appwrite'

export const APPWRITE_ENDPOINT =
  import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1'
export const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID || 'wskwt'
export const APPWRITE_FUNCTION_ID = import.meta.env.VITE_APPWRITE_FUNCTION_ID || 'wskwt-function'

export const client = new Client()
export const functions = new Functions(client)
export const storage = new Storage(client)
export const databases = new Databases(client)
export const teams = new Teams(client)

client.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID)

// Dev keys bypass rate limits and origin checks, so they must never end up in the public bundle.
// For local development put VITE_APPWRITE_DEV_KEY in .env.local (ignored by git).
if (import.meta.env.DEV && import.meta.env.VITE_APPWRITE_DEV_KEY) {
  client.setDevKey(import.meta.env.VITE_APPWRITE_DEV_KEY)
}

export const account = new Account(client)
export { ID } from 'appwrite'
