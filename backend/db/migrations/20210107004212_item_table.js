const tableNames = require('../../src/constants/tableNames');
const {
    addDefaultColumns,
    createNameTable,
    url,
    email,
    references,
  }=require('../../src/lib/tableUtil');
/**
 * @param {import('knex')} knex
 */
exports.up = async (knex)=>{
    await knex.schema.table(tableNames.state,(table)=>{
        table.string('code')
        references(table,tableNames.country);
    });
    await knex.schema.table(tableNames.country,(table)=>{
        table.string('code') 
    });
    await knex.schema.createTable(tableNames.size, (table) => {
        table.increments();
        table.string('name').notNullable();
        table.float('length');
        table.float('width');
        table.float('height');
        table.float('volume');
        references(table, tableNames.shape);
        addDefaultColumns(table);
      });
    await knex.schema.createTable(tableNames.item,(table)=>{
        table.increments();
        references(table,tableNames.user);
        table.string('name').notNullable();
        references(table,tableNames.item_type);
        table.text('description');
        references(table,tableNames.company);
        references(table,tableNames.size);
        table.string('sku',25);//sku is the stock keeping unit used to find item details
        addDefaultColumns(table);
        table.boolean('sparks_joy').defaultTo(true);

    });
    

};
/**
 * @param {import('knex')} knex
 */

exports.down = async(knex)=>{
    //await knex.schema.table(tableNames.address,(table)=>{
    //   references(table,tableNames.country);//updating addres table by droping country_id and adding state_id instead
    //});
    await knex.schema.table(tableNames.state,(table)=>{
        table.dropColumn('code');
        table.dropColumn('country_id');
    });
    await knex.schema.table(tableNames.country,(table)=>{
        table.dropColumn('code')
        
    });
    await knex.schema.dropTable(tableNames.size);

};
