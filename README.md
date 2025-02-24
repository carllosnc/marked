# React Stack

This is a starter template for a React app with the following technologies:

- React
- React Router
- Tailwind CSS
- Clerk
- Vite
- Typescript
- ShadCN/UI
- Turso Database
- Drizzle

### Environment variables

```sh
# Clerk
VITE_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_SIGN_IN_FALLBACK_URL=/
CLERK_SIGN_IN_URL=/sign-in
CLERK_MODE=dev

# Turso Database
VITE_TURSO_DATABASE_URL=
VITE_TURSO_AUTH_TOKEN=
```

### Commands

Run the development server:
```
bun run dev
```

Run the database server:
```
turso dev --db-file database
```

Generate database schema:
```
bun run generate
```

Migrate database:
```
bun run migrate
```

---

Carlos Costa @ 2025


