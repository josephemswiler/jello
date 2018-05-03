const express = require('express')
const router = express.Router()
const allCards = require('./../models/trello.js')

//here require views?

// allCards.selectAll(function(result) {
//     console.log(result)
// })

//route here



router.get("/", function (req, res) {

    allCards.selectAll(function (data) {

        let obj = {
            cards: data
        }

        let lists = {}

        for (let i in data) {
            console.log(data[i].list)
        }



        res.render('index', obj)

    })
})

module.exports = router