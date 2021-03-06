//this file is used to connect to db for querying the database

const knex=require('knex');//in order to querry to db we are using knex so required knex to connect to db
const {Model}=require('objection');//import the model to talk with the db

const knexConfig=require('../knexfile');//as our knexfile is already configured to connect to db for ddl purpose
//const environment=process.env.NODE_ENV||'development';//set the environment of the database
const environment='development';
const connectionConfig=knexConfig[environment];//as per required environment the kenxfile configuration is pulled  
const connection=knex(connectionConfig);//this is the statement to connect kenx to db it not present in knexfile bcoz knexfile is generated using cmd is entry point of querry builder automatically configured

Model.knex(connection);//it will talk to our specific db running to define different relation 

module.exports=connection;//now we can use this anywhere in order to querry the database
//here we have commented the process.env.NODE_ENV beacaues when we run tests jest automatically make NODE_ENV VARIABLE  a test so our test fails
//veio b/w 3:10 to 4:00 no.7