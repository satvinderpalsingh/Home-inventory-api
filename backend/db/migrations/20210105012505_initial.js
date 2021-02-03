const tableNames = require('../../src/constants/tableNames');//include to avoid to typo
const {
    addDefaultColumns,
    createNameTable,
    url,
    email,
    references,
  }=require('../../src/lib/tableUtil');
/**
 * @param {import('knex')} knex//adding this help us to auto complete the knex.schema.
 */
exports.up = async (knex)=> {//async await used because some tables might be depended on other tables PK and FK cocepts 
    await Promise.all([//it contains all the tabels which are independent/has no FK
        knex.schema.createTable(tableNames.user,(table)=>{
            table.increments().notNullable();//increments() automatically set the index ,coloumn name=id, and its index to primary key
            email(table,'email').notNullable().unique();
            table.string('name').notNullable();
            table.string('password', 127).notNullable();
            table.datetime('last_login');
            addDefaultColumns(table);
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
        references(table,'state',false);//in cj it is null
        references(table,'country',false);
        addDefaultColumns(table);//we add created_at ,updated_at and deleted_at collumn to every table
        table.unique(["street_address_1",
        "street_address_2",
        "city",
        "pincode",
        "state_id",
        "country_id"
        //it should not have the null column here bcoz it can ciause the error in insertion as it is alsocompared 
      ]); 
    });
    await knex.schema.createTable(tableNames.company,(table)=>{
        table.increments().notNullable();
        table.string('name').notNullable();
        url(table,'logo_url');
        table.string('description', 1000);//1000 max length of the decription data 
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
