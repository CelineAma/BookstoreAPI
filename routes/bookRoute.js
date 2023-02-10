const express = require("express")
const bookModel = require('../models/books')
const {addBookValidationMW, updateBookValidationMW} = require('../validators/books_validator')

const bookRoute = express.Router()

//book router to get all books
bookRoute.get('/', (req, res) => {
    bookModel.find()
    .then(books => {
        res.send(books)
    })

    .catch(err => {
        console.log(err)
        res.send(err)
    })

//get book by id
bookRoute.get('/:id', (req, res) => {
    const id = req.params.id
    bookModel.findById(id)
    .then(book => {
        res.status(200).send(book)
    })
    .catch(err => {
        console.log(err)
        req.status(404).send(err)
    })
})

//post or add book using the book validation middleware
bookRoute.post('/', addBookValidationMW, (req, res) => {
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
})

//put book route by id, update the existing book details with validations 
bookRoute.put('/:id', updateBookValidationMW, (req, res) => {
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
})

//delete book by id
bookRoute.delete('/:id', (req, res) => {
    const id = req.params.id
        bookModel.findByIdAndRemove(id)
        .then(book => {
            res.status(200).send(book)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})

})

module.exports = bookRoute