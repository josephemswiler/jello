const express = require('express')
const app = express()
const expressHandlebars = require("express-handlebars")
const bodyParser = require("body-parser")
const PORT = process.env.PORT || 3000
const db = require("./models")

app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}))

app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use(express.static("public"))

require("./controllers/jello-controller.js")(app)

db.sequelize.sync().then(function() {
    app.listen(PORT, () => {
        console.log(`App listening on PORT: ${PORT}!`)
    })
})
