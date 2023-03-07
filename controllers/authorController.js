//import the authorModel, the validation middleware
const { func } = require("joi")
const authorModel = require("../models/author")
// const {addAuthorValidationMW, updateAuthorValidationMW} = require('../validators/authors_validator')

//then create the functions
function getAllAuthors (req, res){
    authorModel.find()
    .then(authors => {
        res.send(authors)
    })

    .catch(err => {
        console.log(err)
        res.send(err)
    })
}

function getAuthorsById (req, res){
    const id = req.params.id
    authorModel.findById(id)
    .then(author => {
        res.status(200).send(author)
    })
    .catch(err => {
        console.log(err)
        req.status(404).send(err)
    })
}

function addAuthors (req, res){
    const author = req.body
    author.lastUpdateAt = new Date() //this sets the lastUpdateAt to the current date
    authorModel.create(author)
        .then(author => {
            res.status(201).send(author)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
}

function updateAuthorsById (req, res){
    const id = req.params.id
    const author = req.body
    author.lastUpdateAt = new Date() //this sets the lastUpdateAt to the current date
    authorModel.findByIdAndUpdate(id, author, {new: true})
        .then(newAuthor => {
            res.status(200).send(newAuthor)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
}

function deleteAuthorsById (req, res){
    const id = req.params.id
        authorModel.findByIdAndRemove(id)
        .then(author => {
            res.status(200).send(author)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
}

//export all functions
module.exports = {
getAllAuthors,
getAuthorsById,
addAuthors,
updateAuthorsById,
deleteAuthorsById
}