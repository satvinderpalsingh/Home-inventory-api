const { related_item } = require('../../src/constants/tableNames');
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
    await knex.schema.createTable(tableNames.item_info,(table)=>{
        table.increments();
        references(table,tableNames.user);
        references(table,tableNames.item);
        table.dateTime('purchase_date').notNullable();
        table.dateTime('expiration_date');
        references(table,tableNames.company,false,'retailer');
        table.dateTime('last_used');//nullable beacuse it might be remaning in the desk only
        table.float('purchased_price').notNullable().defaultTo(0);//help to find discounts and can we used in futher buying mrp
        table.float('mrp').notNullable().defaultTo(0);
        addDefaultColumns(table);
        references(table,tableNames.inventory_location);
    });
    await knex.schema.createTable(tableNames.item_image,(table)=>{
        table.increments();
        url(table,'image_url');
        references(table,tableNames.item);
        addDefaultColumns(table);
    });
    await knex.schema.createTable(tableNames.related_item,(table)=>{
        table.increments();
        references(table,tableNames.item);//alert
        references(table,tableNames.item,false,'related_item');//alert if we remove the false then we run a error that you are creating same column because we are having a dulicate to line just above it so we need to differentiate it from the above call
        addDefaultColumns(table);
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
    await knex.schema.dropTable(tableNames.related_item);
    await knex.schema.dropTable(tableNames.item_image);
    await knex.schema.dropTable(tableNames.item_info);//must droped before the item table as it has fk reference to it.
    await knex.schema.dropTable(tableNames.item);
    await knex.schema.dropTable(tableNames.size);
    //use dropTableIfExist('table_name') rather than dropTable() because it will sove our issue of dropping if not exists
};
