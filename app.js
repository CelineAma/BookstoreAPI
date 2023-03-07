//import the libraries/PACKAGES to be used 
const express = require ("express")
const bodyParser = require ("body-parser")
const CONFIG = require ("./config/config.js")

//connect the route
const bookRoute = require("./routes/bookRoute")
const authorRoute = require("./routes/authorRoute")

//import the database
const dbConnect = require("./db/mongodb")


//create the application
const app = express()

//connect to the mongodb 
dbConnect()


//add the middlewares; bodyparsers(either by form urlencoded or json) 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//add the book/author routes to be used as a middleware
app.use('/api/v1/books', bookRoute)
app.use('/api/v1/authors', authorRoute)


//A GET request to confirm that the server is working and add a response
app.get("/", (req, res) => {
    res.send("Hello BookStore!")
})

//create the error handling middleware
app.use((err, req, res, next) => {
    console.log(err)

    const errorStatus = err.status || 500
    res.status(errorStatus).send(err.message)
    next()
})

//add app.listen to access the environmental variables and add event listeners when port starts
app.listen(CONFIG.PORT, () => {
    console.log(`The Server started on http://localhost:${CONFIG.PORT}`)
})