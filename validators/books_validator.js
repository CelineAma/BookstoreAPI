const Joi = require ("joi");


//create the book validator( for adding books to the db) as an object using joi
const addBookSchema = Joi.object({

    title: Joi.string()
            .min(5)
            .max(255)
            .trim()
            .required(),

    bookDescription: Joi.string()
            .min(5)
            .max(600)
            .trim()
            .optional(),

    isbn: Joi.number()
            .min(13)
            .required(),

    year: Joi.number()
            .integer()
            .max(2023)
            .required(),

    price: Joi.number()
            .min(0)
            .required(),

    createdAt: Joi.date()
            .default(Date.now),

    lastUpdateAt: Joi.date()
            .default(Date.now),
})

//create the book validator( for adding books to the db) as an object using joi
const updateBookSchema = Joi.object({

        title: Joi.string()
                .min(5)
                .max(255)
                .trim(),
    
        bookDescription: Joi.string()
                .min(5)
                .max(600)
                .trim()
                .optional(),
    
        isbn: Joi.number()
                .min(13),
    
        year: Joi.number()
                .integer()
                .max(2023),
    
        price: Joi.number()
                .min(0)
    })


//turning the validation into a middleware for adding books

async function addBookValidationMW (req, res, next){
    const bookPayload = req.body

//run the validation here

try {
    await addBookSchema.validateAsync(bookPayload)
    next()
    }
    catch (error) {
next(
        {message: error.details[0].message,
        status: 406}
    )
    }
}


//turning the validation into a middleware for updating books

async function updateBookValidationMW (req, res, next){
        const bookPayload = req.body
    
    //run the validation here
    
    try {
        await updateBookSchema.validateAsync(bookPayload)
        next()
        }
        catch (error) {
    next(
            {message: error.details[0].message,
            status: 406}
        )
        }
    }


module.exports = {
        addBookValidationMW,
        updateBookValidationMW
}