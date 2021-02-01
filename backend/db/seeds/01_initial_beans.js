const tableNames = require('../../src/constants/tableNames');


/**
 * @param {import('knex')} knex //by adding thus we are defining that our  knex Parans is of type Knex which help our vs code to provide auto assist whenn we are using it
 */
exports.seed = async (knex) => {
    const rajasthan = await knex(tableNames.state)
        .where({
            name: 'RJ',
        }).first();

    const ind = await knex(tableNames.country)
        .where({
            name: 'IND',
        }).first();
        //[address_id] so that we can have only one object not an array of one object desttructuring 
    await knex(tableNames.address)
        .insert({
        street_address_1:"plotNo. SP-3&4",
        street_address_2:"Industrial Area Kaharani Bhiwandi(Ext.),Tijara",
        state_id:rajasthan.id,
        city:"Alwar",
        pincode:"301019",
        country_id:ind.id,
        latitude:27.933743,
        longitude:76.853127})
};
