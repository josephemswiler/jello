const express = require('express')
const router = express.Router()
const allCards = require('./../models/trello.js')

//here require views?

// allCards.selectAll(function(result) {
//     console.log(result)
// })

//route here

router.get("/", function (req, res) {
    res.render("index")
})

module.exports = router