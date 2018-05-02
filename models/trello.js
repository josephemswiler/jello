const orm = require('./../config/orm.js')

orm.selectAll('cards', function(result) {
    console.log(result)
})