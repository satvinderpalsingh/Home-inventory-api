const { Model } = require('objection');
const schema = require('./item_infos.schema.json');
const tableNames = require('../../../constants/tableNames');

class Item_info extends Model {
    static get tableName() {
        return tableNames.item_info;
    }
    static get jsonSchema() {
        return schema
    }

}
module.exports = Item_info
