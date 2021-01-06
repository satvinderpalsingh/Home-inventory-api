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
    await knex.schema.table(tableNames.address,(table)=>{
        table.dropColumn("country_id");//updating addres table by droping country_id and adding state_id instead
    });
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
    

};
/**
 * @param {import('knex')} knex
 */

exports.down = async(knex)=>{
    await knex.schema.table(tableNames.address,(table)=>{
       references(table,tableNames.country);//updating addres table by droping country_id and adding state_id instead
    });
    await knex.schema.table(tableNames.state,(table)=>{
        table.dropColumn('code');
        table.dropColumn('country_id');
    });
    await knex.schema.table(tableNames.country,(table)=>{
        table.dropColumn('code')
        
    });
    await knex.schema.dropTable(tableNames.size);

};
