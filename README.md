# Getting started with CASE

Create a CRUD app in minutes with [CASE](https://case.app).

## Install

```bash
npm install
cp .env.example .env
```

## Running the app

```bash
npm start
```

When cloning the app, the DB is empty by default. You can add data by doing:

```bash
# Seeds dummy data in DB
npm run seed
```

You can use the following credentials:<br/>
email: **user1@case.app**<br/>
password: **case**

Voilà ! Your application is accessible at http://localhost:4000.

## Create an entity

Run this command replacing `my-entity` by your entity name (customers, projects, cats...)

```bash
# Creates a new my-entity.entity.ts file
npm run case:entity my-entity
```

## Community & resources

- [Docs](https://docs.case.app) - To help you create your CASE application
- [Discord](https://discord.gg/FepAked3W7) - Come chat with the community
- [Dev.to](https://dev.to/casejs) - Stay tuned
- [Github](https://github.com/casejs/case/issues) - Report bugs and share ideas
