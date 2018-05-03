const connection = require('./connection.js')

class ObjectRelationalMapping {
    constructor(table, columns) {
        this.table = table
        this.columns = columns
    }

    selectAll(callback) {

        let queryString = 'SELECT * FROM ??;'

        connection.query(queryString, this.table, function (err, result) {
            if (err) {
                throw err
            }
            callback(result)
        })
    } //selectAll

    insertOne(text, list, callback) {

        let queryString = `INSERT INTO ?? (??) VALUES (?, ?);`

        connection.query(queryString, [this.table, this.columns, text, list], function (err, result) {
            if (err) {
                throw err
            }
            callback(result)
        })
    } //insertOne

    updateOne(itemId, text, list, callback) {

        let queryString = 'UPDATE ?? SET ?, ? WHERE ?;'

        let textUpdate = {}
        textUpdate[this.columns[0]] = text

        let listUpdate = {}
        listUpdate[this.columns[1]] = list

        connection.query(queryString, [this.table, textUpdate, listUpdate, {
            id: itemId
        }], function (err, result) {
            if (err) {
                throw err
            }
            callback(result)
        })
    } //updateOne

    deleteOne(itemId, callback) {

        let queryString = 'DELETE FROM ?? WHERE ?;'

        connection.query(queryString, [this.table, {
            id: itemId
        }], function (err, result) {
            if (err) {
                throw err
            }
            callback(result)
        })
    } //deleteOne
} //ObjectRelationalMapping

module.exports = ObjectRelationalMapping