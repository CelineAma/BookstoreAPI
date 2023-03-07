//import the bookModel, the validation middleware
const { func } = require("joi")
const bookModel = require("../models/books")
// const {addBookValidationMW, updateBookValidationMW} = require('../validators/books_validator')

//then create the functions
function getAllBooks (req, res){
    bookModel.find()
    .then(books => {
        res.send(books)
    })

    .catch(err => {
        console.log(err)
        res.send(err)
    })
}

function getBooksById (req, res){
    const id = req.params.id
    bookModel.findById(id)
    .then(book => {
        res.status(200).send(book)
    })
    .catch(err => {
        console.log(err)
        req.status(404).send(err)
    })
}

function addBooks(req, res){
    const book = req.body
    book.lastUpdateAt = new Date() //this sets the lastUpdateAt to the current date
    bookModel.create(book)
        .then(book => {
            res.status(201).send(book)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
}

function updateBooksById (req, res){
    const id = req.params.id
    const book = req.body
    book.lastUpdateAt = new Date() //this sets the lastUpdateAt to the current date
    bookModel.findByIdAndUpdate(id, book, {new: true})
        .then(newBook => {
            res.status(200).send(newBook)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
}

function deleteBooksById (req, res){
    const id = req.params.id
        bookModel.findByIdAndRemove(id)
        .then(book => {
            res.status(200).send(book)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
}

//export all functions
module.exports = {
getAllBooks,
getBooksById,
addBooks,
updateBooksById,
deleteBooksById
}