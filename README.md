# next-admin-sample

- Serve: Next.js
- ORM: prisma
- CSV parser: papaparse
- UI: NextUI
- DB: sqlite

## at first

```
npm i
touch .env
echo "DATABASE_URL=\"file:./dev.db\"" > .env
npx prisma migrate dev
```

## serve

```
npm run dev
open http://localhost:3000
```

## note

if you change prisma schema, make migrate like below

```
npx prisma migrate dev --name {some_name}
```

https://www.prisma.io/docs/concepts/components/prisma-migrate/get-started