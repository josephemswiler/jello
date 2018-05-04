const express = require('express')
const app = express()
const router = require('./controllers/jello-controller.js')
const bodyParser = require('body-parser')
const expressHandlebars = require("express-handlebars");
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}!`)
})

app.use('/', router)

app.use(express.static('./public/'))

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

app.engine("handlebars", expressHandlebars({ defaultLayout: "main" }))
app.set("view engine", "handlebars")