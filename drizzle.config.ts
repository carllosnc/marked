import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './data/drizzle',
  schema: './data/db-schemas/*-schema.ts',
  dialect: 'turso',
  dbCredentials: {
    url: "http://127.0.0.1:8080",
    authToken: "xxx",
  },
});