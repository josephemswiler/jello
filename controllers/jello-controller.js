const express = require('express')
const router = express.Router()
const allCards = require('./../models/jello.js')

//here require views?

// allCards.selectAll(function(result) {
//     console.log(result)
// })

//route here



router.get("/", function (req, res) {

    allCards.selectAll(function (data) {

        let cards = {
            obj: data
        }

        

        console.log(cards)

        res.render('index')

    })
})

module.exports = router