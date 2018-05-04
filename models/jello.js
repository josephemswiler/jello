const ObjectRelationalMapping = require('./../config/orm.js')

// class Card extends ObjectRelationalMapping {
//     constructor(cardId, cardText, cardList) {
//         super('cards', ['text', 'list'])
//         this.cardId = cardId
//         this.cardText = cardText
//         this.cardList = cardList
//     }
// }

let allCards = new ObjectRelationalMapping('cards', ['text', 'list'])

// card.selectAll(function(result) {
//     console.log(result)
// })

// orm.insertOne('Make ORM a class', 'Doing', function(result) {
//     console.log(result)
// })

// orm.updateOne(6, 'Make ORM a class', 'Doing', function(result) {
//     console.log(result)
// })

// orm.deleteOne(6, function(result) {
//     console.log(result)
// })

module.exports = allCards