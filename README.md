<p align="center">
  <a href="https://www.case.app">
    <img alt="CASE" src="https://avatars.githubusercontent.com/u/83036240?s=400&u=09ae7331466d364a857ed566d89b4a3d8e76fbbf&v=4" width="150" />
  </a>
</p>
<h1 align="center" style="font-weight: bold">
  CASE Starter
</h1>

This starter allows you to create an application or an ERP using CASE. CASE is fully customizable open to contributions. You can contribute by adding features, reporting bugs or participating in discussions.

# Getting started

**Install and serve**

CASE uses **MySQL** for the database. You will need to create a new database and add the name to the _DB_NAME_ property of your `.env` file. The default name for the database is **case**. Once done you can install dependencies:

```sh
npm run case:install
```

Then you can serve the app:

```sh
  npm run start:client

  # Simultaneously open a 2nd terminal window and run :
  npm run start:server

```

**Seed dummy data**

```sh
npm run seed
```

**Go to http://localhost:4200/**

And Use your CASE admin’s user credentials to log in.

> You can use the email `admin@case.app` and password `case` to log in.

