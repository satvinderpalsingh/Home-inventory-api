function addDefaultColumns(table){//as every table in a database will have the created_at ,updated_at and deleted_at column in it
    table.timestamps(false, true);//doubt 
    table.datetime('deleted_at');
}
function createNameTable(knex,table_name){//for same tables in database
    return knex.schema.createTable(table_name,(table)=>{
        table.increments().notNullable();
        table.string('name').notNullable().unique();
        addDefaultColumns(table)//here we are specyfying the deleted_at column which is an null for soft deletes hence concetptsd of soft deletes
    }); 
}
function references(table,table_name,notNullable=true,coloumnName=''){//coloumnName added because we want column name rather than table(name)_id and we use js a||b if a is not null then use a otherwise uses the normal table_name
    const definition=table.integer(`${coloumnName||table_name}_id`).unsigned().references('id').inTable(table_name).onDelete('cascade');//cascade take care about if we delete a row in parent table then  it must be deleted in child tables for data integrity
    if (notNullable){
        definition.notNullable();
    }
}
function url(table,coloumnName){
    table.string(coloumnName,2000);
}
function email(table,coloumnName){
    return table.string(coloumnName,254);//we are returning this because in user we want it to be not nullable and unique but not in manufacturer
}
module.exports = {
    addDefaultColumns,
    createNameTable,
    url,
    email,
    references,
  };