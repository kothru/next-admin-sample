# next-admin-sample

- ORM: prisma
- csv parser: papaparse
- UI: NextUI

## at first

npm i
touch .env
echo "DATABASE_URL=\"file:./dev.db\"" > .env
npx prisma migrate dev

## serve

npm run dev
open http://localhost:3000