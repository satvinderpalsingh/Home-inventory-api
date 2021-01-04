const tableNames = require('../../src/constants/tableNames');//include to avoid to typo

function addDefaultColumns(table){//as every table in a database will have the created_at ,updated_at and deleted_at column in it
    table.timestamps(false, true);
    table.datetime('deleted_at');
}
function createNameTable(knex,table_name){//for same tables in database
    return knex.schema.createTable(table_name,(table)=>{
        table.increments().notNullable();
        table.string('name').notNullable().unique();
        addDefaultColumns(table)
    });
}
function references(table,table_name){
    table.integer(`${table_name}_id`).unsigned().references('id').inTable(table_name).onDelete('cascade');//cascade take care about if we delete in foreign table then  it must be deleted in tables t is refrencing
}
function url(table,coloumnName){
    table.string(coloumnName,2000);
}
function email(table,coloumnName){
    return table.string(coloumnName,254);//we are returning this because in user we want it to be not nullable and unique but not in manufacturer
}
/**
 * @param {import('knex')} knex
 */
exports.up = async (knex)=> {//async await used because some tables might be depended on other tables PK and FK cocepts 
    await Promise.all([//it contains all the tabels which are independent/has no FK
        knex.schema.createTable(tableNames.user,(table)=>{
            table.increments().notNullable();//increments() automatically set the index ,coloumn name=id, and its index to primary key
            email(table,'email').notNullable().unique();
            table.string('name').notNullable();
            table.string('password', 127).notNullable();
            table.datetime('last_login');
            addDefaultColumns(table)
        }),
        createNameTable(knex, tableNames.item_type),
        createNameTable(knex, tableNames.country),
        createNameTable(knex, tableNames.state),
        createNameTable(knex, tableNames.shape),
        knex.schema.createTable(tableNames.inventory_location, (table) => {
          table.increments().notNullable();
          table.string('name').notNullable().unique();
          table.string('description', 1000);
          url(table,'image_url');
          addDefaultColumns(table);
        }),

    ]);
    await knex.schema.createTable(tableNames.address,(table)=>{
        table.increments().notNullable();
        table.string('street_address_1', 50).notNullable();
        table.string('street_address_2', 50);
        table.string('city', 50).notNullable();
        table.string('pincode', 15).notNullable();//--zipcode
        table.double('latitude').notNullable();
        table.double('longitude').notNullable();
        references(table,'state');
        references(table,'country');
        addDefaultColumns(table);
    });
    await knex.schema.createTable(tableNames.company,(table)=>{
        table.increments().notNullable();
        table.string('name').notNullable();
        url(table,'logo_url');
        table.string('description', 1000);
        url(table,'website_url');
        email(table,'email');
        references(table,'address');
        addDefaultColumns(table);
    });
};

exports.down = async (knex)=>{
  await Promise.all(
    [
      tableNames.company,
      tableNames.address,
      tableNames.user,
      tableNames.item_type,
      tableNames.country,
      tableNames.state,
      tableNames.shape,
      tableNames.inventory_location,
    ].map((tableName) => knex.schema.dropTableIfExists(tableName))
  );
};
