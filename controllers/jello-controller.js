const db = require("../models");

module.exports = function (app) {

    app.get('/', function (req, res) {
        let index = 0

        // if(req.params.id)
        //     index = parseInt(req.params.id)

        db.Boards.findAll({
            include: [{
                model: db.Lists,
                include: [{
                    model: db.Cards
                }]
            }]
        }).then(Boards => {
            const boardData = Boards.map(Boards => {
                return Object.assign({}, {
                    id: Boards.id,
                    name: Boards.name,
                    starred: Boards.starred,
                    Lists: Boards.Lists.map(Lists => {
                        return Object.assign({}, {
                            id: Lists.id,
                            name: Lists.name,
                            board: Lists.board_id,
                            starred: Lists.starred,
                            Cards: Lists.Cards.map(Cards => {
                                return Object.assign({}, {
                                    id: Cards.id,
                                    text: Cards.text,
                                    list: Cards.list_id,
                                    starred: Cards.starred
                                })
                            })
                        })
                    })
                })
            })
            res.render('index', {
                Boards: boardData,
                currentBoard: boardData[index]
            })
        })
    })

    app.get('/:id', function (req, res) {
        let index = 0

        if(req.params.id !== undefined)
            index = parseInt(req.params.id)

        db.Boards.findAll({
            include: [{
                model: db.Lists,
                include: [{
                    model: db.Cards
                }]
            }]
        }).then(Boards => {
            const boardData = Boards.map(Boards => {
                return Object.assign({}, {
                    id: Boards.id,
                    name: Boards.name,
                    starred: Boards.starred,
                    Lists: Boards.Lists.map(Lists => {
                        return Object.assign({}, {
                            id: Lists.id,
                            name: Lists.name,
                            board: Lists.board_id,
                            starred: Lists.starred,
                            Cards: Lists.Cards.map(Cards => {
                                return Object.assign({}, {
                                    id: Cards.id,
                                    text: Cards.text,
                                    list: Cards.list_id,
                                    starred: Cards.starred
                                })
                            })
                        })
                    })
                })
            })
            res.render('index', {
                Boards: boardData,
                currentBoard: boardData[index]
            })
        })
    })

    app.get('/about', (req, res) => {
        res.render('index')
    })

    app.get('/api', (req, res) => {
        db.Boards.findAll({
            include: [{
                model: db.Lists,
                include: [{
                    model: db.Cards
                }]
            }]
        }).then(Boards => {
            const boardData = Boards.map(Boards => {
                return Object.assign({}, {
                    id: Boards.id,
                    name: Boards.name,
                    starred: Boards.starred,
                    Lists: Boards.Lists.map(Lists => {
                        return Object.assign({}, {
                            id: Lists.id,
                            name: Lists.name,
                            board: Lists.board_id,
                            starred: Lists.starred,
                            Cards: Lists.Cards.map(Cards => {
                                return Object.assign({}, {
                                    id: Cards.id,
                                    text: Cards.text,
                                    list: Cards.list_id,
                                    starred: Cards.starred
                                })
                            })
                        })
                    })
                })
            })
            res.json(boardData)
        })
    })

    //Create
    //-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
    app.post('/api/boards', (req, res) => {
        db.Boards.create({
            name: req.body.name,
        }).then(function (data) {
            res.json(data)
        })
    })

    app.post('/api/lists', (req, res) => {
        db.Lists.create({
            name: req.body.name,
            board_id: req.body.board_id
        }).then(function (data) {
            res.json(data)
        })
    })

    app.post('/api/cards', (req, res) => {
        db.Cards.create({
            text: req.body.text,
            list_id: req.body.list_id
        }).then(function (data) {
            res.json(data)
        })
    })

    //Read
    //-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
    app.get('/api/boards', (req, res) => {
        db.Boards.findAll({}).then(function (data) {
            res.json(data)
        })
    })

    app.get('/api/lists', (req, res) => {
        db.Lists.findAll({}).then(function (data) {
            res.json(data)
        })
    })

    app.get('/api/cards', (req, res) => {
        db.Cards.findAll({}).then(function (data) {
            res.json(data)
        })
    })

    //Update
    //-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
    app.put("/api/boards", (req, res) => {
        db.Boards.update({
            name: req.body.name,
            starred: req.body.starred
        }, {
            where: {
                id: req.body.id
            }
        }).then(function (data) {
            res.json(data)
        })
    })

    app.put("/api/lists", (req, res) => {
        db.Lists.update({
            name: req.body.name,
            starred: req.body.starred
        }, {
            where: {
                id: req.body.id
            }
        }).then(function (data) {
            res.json(data)
        })
    })

    app.put("/api/cards", (req, res) => {
        db.Cards.update({
            text: req.body.text,
            starred: req.body.starred
        }, {
            where: {
                id: req.body.id
            }
        }).then(function (data) {
            res.json(data)
        })
    })

    //Delete
    //-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
    app.delete("/api/boards/:id", (req, res) => {
        db.Boards.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (data) {
            res.json(data)
        })
    })

    app.delete("/api/lists/:id", (req, res) => {
        db.Lists.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (data) {
            res.json(data)
        })
    })

    app.delete("/api/cards/:id", (req, res) => {
        db.Cards.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (data) {
            res.json(data)
        })
    })
}