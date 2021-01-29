// Update with your config settings.
require('dotenv').config();
module.exports = {
  development: {
    client: 'pg',//it will connect to postgress using the node module pg we can specify any db to vased on our requirement we have installed the pg node-module in order to talk to db
    connection: {
      database: process.env.POSTGRES_DB,
      user:     process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD
    },
    migrations:{
      directory:'./db/migrations',
    },
    seeds:{
      directory:'./db/seeds',
    },
  },

};
