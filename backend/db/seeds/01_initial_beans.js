const tableNames = require('../../src/constants/tableNames');
const item_types=require('../../src/constants/item_types');
const item_shapes=require('../../src/constants/item_shapes');

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
    await knex(tableNames.item_type).insert(item_types);
    await knex(tableNames.shape).insert(item_shapes);
    const [address_id] = await knex(tableNames.address)
        .insert({
            street_address_1: "plotNo. SP-3&4",
            street_address_2: "Industrial Area Kaharani Bhiwandi(Ext.),Tijara",
            state_id: rajasthan.id,
            city: "Alwar",
            pincode: "301019",
            country_id: ind.id,
            latitude: 27.933743,
            longitude: 76.853127
        }).returning('id');//we are returning the id of the inserted addres so that we can use the that address_id in seeding the company refernce id  
    await knex.table(tableNames.company).insert({
        name: 'Dr. Oteker',
        logo_url: 'https://imgur.com/NcqtzQY',
        description:"Dr. Oetker is a German multinational company that produces baking powder, cake mixes, frozen pizza, pudding, cake decoration, cornflakes, and various other products.",
        website_url: 'https://www.oetker.in/',
        email: 'service@oetker.in',
        address_id,
    });

};
