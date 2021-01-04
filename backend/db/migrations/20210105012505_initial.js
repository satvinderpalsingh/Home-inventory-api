const tableNames = require('../../src/constants/tableNames');

function addDefaultColumns(table){
    table.timestamps(false, true);
    table.datetime('deleted_at');
}
function createNameTable(knex,table_name){
    return knex.schema.createTable(table_name,(table)=>{
        table.increments().notNullable();
        table.string('name').notNullable().unique();
        addDefaultColumns(table)
    });
}
/**
 * @param {import('knex')} knex
 */
exports.up = async (knex)=> {
    await Promise.all([
        knex.schema.createTable(tableNames.user,(table)=>{
            table.increments().notNullable();//increments() automatically set the index ,coloumn name=id, and its index to primary key
            table.string('email',254).notNullable().unique();
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
          table.string('image_url',2000);
          addDefaultColumns(table);
        }),

    ]);
  
};

exports.down = async (knex)=>{
  await Promise.all(
    [
      tableNames.user,
      tableNames.item_type,
      tableNames.country,
      tableNames.state,
      tableNames.shape,
      tableNames.inventory_location,
    ].map((tableName) => knex.schema.dropTableIfExists(tableName))
  );
};
