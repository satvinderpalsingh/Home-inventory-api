const { Model } = require('objection');
const tableNames = require('../../constants/tableNames');
const schema = require('./companies.schema.json');
class Companies extends Model {
    static get tableName() {
        return tableNames.company;
    }
    static get jsonSchema() {
        return schema
    }

}
module.exports = Companies