![Image of Snuuper](http://www.snuuper.com/img/logo-default.png)

# Snuuper Restful Api Node/Mysql

## Description
Restful API for Node.js and Mysql, based [Brian Alois](https://codeburst.io/build-a-rest-api-for-node-mysql-2018-jwt-6957bcfc7ac9) example

### Api content:

- [Express](http://expressjs.com/es/)
- [Sequelize](http://docs.sequelizejs.com/)
- [Passport](http://www.passportjs.org/)
- [Swagger](https://swagger.io/)

## Installation

#### Donwload Code or Clone the Repo

```
git clone {repo_name}
```

#### Install Node Modules
```
npm install
```
or
```
yarn
```

#### Create .env File
You will find a example.env file in the home directory. Paste the contents of that into a file named .env in the same directory. 
Fill in the variables to fit your application

### Create database Blank

All values as they are in the .env file

creates table if they do not already exist

- Database name: snuuper
- User name: snuuper (with all grant)
- Password: see file .env

app.js call:

```
models.sequelize.sync();
```

### Upload initial data
```
yarn restoredb
```


### Path folders:

- bin: files to up the server
- config: config.js to setting database, and jwt 
- controllers: UserController.js main source code of application 
- fixtures: usersData, script to initialize application data, execute this with
```
yarn restoredb
```
- helpers:  utilities files for the application
- middleware: to manipulate the flow of the routes
- migrations: sequelize migrations files
- models: objects relations mapping, sequelize schemas
- public: swagger documentation
- routes: routes (urls) settings
- sql: sql files

### Run application

```
yarn start
```

### Documentaion API

Swagger api documentation

```
http://{server_domain}/v1/docs/
```