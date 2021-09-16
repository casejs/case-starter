# README

This README would normally document whatever steps are necessary to get your application up and running.

### Install

Install schematics cli and CASE schematics globally :

```bash
sudo npm i -g @angular-devkit/schematics-cli
sudo npm i -g @case-app/schematics
```

_Note for development :_ Always make sure that you have the latest version of those 2 dependencies with `@latest` as the versions evolve very fast.

At the moment there is no CLI to crate a new project in one command so you have to clone or download the [CASE source code](https://github.com/case-app/case) and then open your terminal in the CASE root folder for the following steps.

```
npm run install
```

- Create a new DB, you can name it "case" for example
- Eventually change DB name into `/server/.env`

### Serve

- Open 2 terminal windows and run `npm run start:client` and `npm run start:server` simultaneously and open your browser on `http://localhost:4200`
- Important for DEMO : `npm run seed` for dummy data. You can then connect with the user **admin@case.app** with the password **case**

## Create a resource

```
npm run case:resource
```

Check the full documentation at https://case-app.github.io/docs/#/.
