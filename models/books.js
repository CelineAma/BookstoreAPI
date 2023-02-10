const mongoose = require ("mongoose");

//define the schema
const Schema = mongoose.Schema;


//create the book schema
const BookSchema =  new Schema({

    title: {
        type: String,
        required: true
    },

    bookDescription: {
        type: String,
        required: false
    },

    isbn: {
        type: Number,
        required: true,
        unique: [true, 'ISBN must be unique'] //validation with custom message
    },

    year: {
        type: Number,
        required: true,
        max: [2023, 'Year must be less than or equal to 2023'] //validation with custom message
    },

    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be less than or equal to 0'] //validation with custom message
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    lastUpdateAt: {
        type: Date,
        default: Date.now
    },

    
})

//create the book model
const Book = mongoose.model("Book", BookSchema)

module.exports = Book