const orm = require('./../config/orm.js')

orm.selectAll(function(result) {
    console.log(result)
})

// orm.insertOne('Make ORM a class', 'Doing', function(result) {
//     console.log(result)
// })

orm.updateOne(6, 'Make ORM a class', 'Ideas', function(result) {
    console.log(result)
})