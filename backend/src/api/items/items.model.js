const { Model } = require('objection');
const schema = require('./item.schema.json');
const tableNames = require('../../constants/tableNames');

class Item extends Model {
    static get tableName() {
        return tableNames.item;
    }
    static get jsonSchema() {
        return schema
    }

}
module.exports = Item
