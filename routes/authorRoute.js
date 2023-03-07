const express = require("express")
const authorModel = require('../models/author')
const {addAuthorValidationMW, updateAuthorValidationMW} = require('../validators/authors_validator')

const authorController = require('../controllers/authorController')

const authorRoute = express.Router()

//author router to get all authors
authorRoute.get('/', authorController.getAllAuthors)

//get author by id
authorRoute.get('/:id', authorController.getAuthorsById)

//post or add author using the author's validation middleware
authorRoute.post('/', addAuthorValidationMW, authorController.addAuthors)

//put author route by id, update the existing author details with validations 
authorRoute.put('/:id', updateAuthorValidationMW, authorController.updateAuthorsById)

//delete author by id
authorRoute.delete('/:id', authorController.deleteAuthorsById)



module.exports = authorRoute