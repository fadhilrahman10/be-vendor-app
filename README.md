# Setup Project

Create .env file

```
DATABASE_URL="postgresql://user:password@localhost:5432/db_vendor?schema=public"
```

```shell

npm install

npx prisma migrate dev

npx prisma generate

npm run build

npm run start

```