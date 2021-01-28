//file started with 00_initials because in order to maintain the sequence of seeding for db consistency
const crypto = require('crypto');//random password generator
const bcrypt = require('bcrypt');//to secure the passwords
//const orderTableNames = require('../../src/constants/orderTableNames');//help us to delete the tables in order for consistency
const tableNames = require('../../src/constants/tableNames');
const countries=require('../../src/constants/countries');
const states=require('../../src/constants/states');

/**
 * @param {import('knex')} knex
 */
exports.seed = async (knex) => {
  await Promise.all(Object.keys(tableNames).map((name) => knex(name).del()));

  const password = crypto.randomBytes(15).toString('hex');//random password
  const user = {//this object will populate/seed the user table for us 
    email: 'satvinder@computer.com',//id field is not orovided we can add it it will automatically added by posytgress and incremented also..
    name: 'satvinder',
    password: await bcrypt.hash(password, 12),//password encrypted 12 is the count of brute force to break it
  };
  const [createdUser]=await knex(tableNames.user).insert(user).returning('*');// INSERTING USER OBJECT INSIDE IT postgress allows us to see the data that we have inserted usiing returning('*') in an array form
  const insertedCountries=await knex(tableNames.country).insert(countries,"*");//we can send single object as well as array of object also at one time.(sometimes we need a refernece of seeded objects so we can get it using .returning("*") * means all objects or using "*" argument in insert())
  //as we now that states table has FK references to countries so we have seeded the countries table first
  //then before seeding the states table we need to seed the not null refernce column of state to countries
  //we need to maintain the different states file for different states of a particular countries because according to countrie name that we know from countries file we 
  //-can filter  countrie_code pass it to specific states file
  //initially states represnet states of india only  
  const ind = insertedCountries.find((country) => country.name === 'IND');
  states.forEach((state) => {
    state.country_id = ind.id;
  });
  await knex(tableNames.state).insert(states);
};

