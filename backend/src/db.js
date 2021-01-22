//this file is used to connect to db for querying the database

const knex=require('knex');//in order to querry to db we are using knex so required knex to connect to db
const knexConfig=require('../knexfile');//as our knexfile is already configured to connect to db for ddl purpose
const environment=process.env.NODE_ENV || 'development';//set the environment of the database
const connectionConfig=knexConfig[environment];//as per required environment the kenxfile configuration is pulled  
const connection=knex(connectionConfig);//this is the statement to connect kenx to db it not present in knexfile bcoz knexfile is generated using cmd is entry point of querry builder automatically configured


module.exports=connection;//now we csn use this anywhere in order to querry the database