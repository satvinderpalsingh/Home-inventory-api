//file started with 00_initials because in order to maintain the sequence of seeding for db consistency
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const orderTableNames = require('../../src/constants/orderTableNames');
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
  },Promise.resolve());

  const password = crypto.randomBytes(15).toString('hex');
  const user = {//this object will populate/seed the user table for us 
    email: 'satvinder.computer',//id field is not orovided we can add it it will automatically added by posytgress and incremented also..
    name: 'satvinder',
    password: await bcrypt.hash(password, 12),//random password
  };
  const [createdUser]=await knex(tableNames.user).insert(user).returning('*');// INSERTING USER OBJECT INSIDE IT postgress allows us to see the data that we have inserted usiing returning('*') in an array form
  await knex(tableNames.country).insert(countries);
  await knex(tableNames.state).insert(states);


};