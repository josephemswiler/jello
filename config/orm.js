const connection = require('./connection.js')

// insertOne()
// updateOne()

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

        let queryString = 'UPDATE ?? SET ?, ? WHERE ?'

        let textUpdate = {}
        textUpdate[this.columns[0]] = text

        let listUpdate = {}
        listUpdate[this.columns[1]] = list

        let reference = {
            id: itemId
        }

        connection.query(queryString, [this.table, textUpdate, listUpdate, reference], function (err, result) {
            if (err) {
                throw err
            }
            callback(result)
        })
    } //updateOne
}

let orm = new ObjectRelationalMapping('cards', ['text', 'list'])

module.exports = orm