const { array } = require("joi");
const mongoose = require ("mongoose");

//define the schema
const Schema = mongoose.Schema;


//create the author's schema
const AuthorSchema =  new Schema({

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    country: {
        type: String,
        required: false,
        
    },

    dateOfBirth: {
        type: date,
        required: false,
        max: [2023, 'Year must be less than or equal to 2023'] //validation with custom message
    },

    otherBooks: {
        type: array,
        default: []
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    lastUpdateAt: {
        type: Date,
        default: Date.now
    }

    
})

//create the author's model
const Author = mongoose.model("Author", AuthorSchema)

module.exports = Author