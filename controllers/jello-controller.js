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

        //list 
            //list id
            //list name
            //board id

        //boards
            //board id
            //board name

        //text, create new id, ref list id on

        // let lists = []

        // for (let i in data) {
        //     lists.push(data[i].list)
        // }

        // let uniqueLists = [...new Set(lists)]

        // let listObj = {}

        // for (let i in uniqueLists) {
        //     listObj['name'] = uniqueLists[i]
        // } 
        // obj, list, id, text
        // console.log(listObj)

        // obj[list] = listObj

        console.log(cards)

        res.render('index')

    })
})

module.exports = router