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

1. **Install and serve**

   Copy the environment file and set your environment variables:

   ```sh
   cp server/.env.example server/.env
   ```

   CASE uses **MySQL** for the database. You will need to create a new database and add the name to the _DB_NAME_ property of your `.env` file. The default name for the database is **case**. Once done you can install dependencies:

   ```sh
   npm run case:install

   npm run start:client

   # Simultaneously open a 2nd terminal window and run :
   npm run start:server

   ```

2. **Seed dummy data**

   ```sh
   npm run seed
   ```

3. **Got http://localhost:4200/**
   And Use your CASE admin’s user credentials to log in.

   > You can use the email `admin@case.app` and password `case` to log in.

# Deploying to production

...Coming soon
