import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './data/drizzle',
  schema: './data/db-schemas/*-schema.ts',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.VITE_TURSO_DATABASE_URL!,
    authToken: process.env.VITE_TURSO_AUTH_TOKEN!,
  },
})
