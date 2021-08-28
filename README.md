# README

This README would normally document whatever steps are necessary to get your application up and running.

### Install

Install schematics cli and abacus-schematics globally :

```bash
sudo npm i -g @angular-devkit/schematics-cli
sudo npm i -g @case-app/schematics
```

_Note for development :_ Always make sure that you have the latest version of those 2 dependencies with `@latest` as the versions evolve very fast.

```
npm run install
```

- Create a DB with the codename "mclaren"
- Change DB name to mclaren into `/server/.env`

### Serve

- Open 2 terminal windows and run `npm run start:client` and `npm run start:server` simultaneously and open your browser on http://localhost:4200
- Important for DEMO : `npm run seed` for dummy data. You can then connect with the user **admin@case.app** with the password **case**

## Create a resource

```
npm run case:resource
```

Check the full documentation at https://case-app.github.io/docs/#/.
