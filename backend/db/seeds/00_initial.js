//file started with 00_initials because in order to maintain the sequence of seeding for db consistency
const crypto = require('crypto');//random password generator
const bcrypt = require('bcrypt');//to secure the passwords
const orderTableNames = require('../../src/constants/orderTableNames');//help us to delete the tables in order for consistency
const tableNames = require('../../src/constants/tableNames');
const countries=require('../../src/constants/countries');
const states=require('../../src/constants/states');

/**
 * @param {import('knex')} knex
 */
exports.seed = async (knex) => {
  await orderTableNames//before seeding data we have to delete the table data orderly
  .reduce(async (promise,table_name)=>{
    await promise;
    return knex(table_name).del();
  },Promise.resolve());//doubt

  const password = crypto.randomBytes(15).toString('hex');//random password
  const user = {//this object will populate/seed the user table for us 
    email: 'satvinder.computer',//id field is not orovided we can add it it will automatically added by posytgress and incremented also..
    name: 'satvinder',
    password: await bcrypt.hash(password, 12),//password encrypted 12 is the count of brute force to break it
  };
  const [createdUser]=await knex(tableNames.user).insert(user).returning('*');// INSERTING USER OBJECT INSIDE IT postgress allows us to see the data that we have inserted usiing returning('*') in an array form
  await knex(tableNames.country).insert(countries);//we can send single object as well as array of object also at one time.
  const state={
    name:'jammu',
    code:'jk',
    country_id:2
  };
  await knex(tableNames.state).insert(state);


};