const express = require("express")
const bookModel = require('../models/books')
const {addBookValidationMW, updateBookValidationMW} = require('../validators/books_validator')

const bookController = require('../controllers/bookController')

const bookRoute = express.Router()

//book router to get all books
bookRoute.get('/', bookController.getAllBooks)

//get book by id
bookRoute.get('/:id', bookController.getBooksById)

//post or add book using the book validation middleware
bookRoute.post('/', addBookValidationMW, bookController.addBooks)

//put book route by id, update the existing book details with validations 
bookRoute.put('/:id', updateBookValidationMW, bookController.updateBooksById)

//delete book by id
bookRoute.delete('/:id', bookController.deleteBooksById)



module.exports = bookRoute