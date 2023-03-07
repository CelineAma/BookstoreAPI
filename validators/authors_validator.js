const Joi = require ("joi");


//"create the author" validator( for creating authors to the db) as an object using joi
const addAuthorSchema = Joi.object({

    firstName: Joi.string()
               .max(255)
            .trim()
            .required(),

    lastName: Joi.string()
            .max(255)
            .trim()
            .required(),

    country: Joi.string()
            .min()
            .optional(),

    dateOfBirth: Joi.date()
            .greater(1-1-1900)
            .less(1-1-2023)
            .required(),

    otherBooks: Joi.array()
            .items(Joi.string())
            .optional(),

    createdAt: Joi.date()
            .default(Date.now),

    lastUpdateAt: Joi.date()
            .default(Date.now)

})

//"add the author" validator( for updating authors to the db) as an object using joi
const updateAuthorSchema = Joi.object({

firstName: Joi.string()
 .max(255)
 .trim(),

lastName: Joi.string()
 .max(255)
 .trim(),

country: Joi.string()
 .min(13),

dateOfBirth: Joi.date()
 .greater(1-1-1900)
 .less(1-1-2023),

otherBooks: Joi.array()
 .items(Joi.string())

    })


//turning the validation into a middleware for creating authors

async function addAuthorValidationMW (req, res, next){
    const authorPayload = req.body

//run the validation here

try {
    await addAuthorSchema.validateAsync(authorPayload)
    next()
    }
    catch (error) {
next(
        {message: error.details[0].message,
        status: 406}
    )
    }
}


//turning the validation into a middleware for updating authors

async function updateAuthorValidationMW (req, res, next){
        const authorPayload = req.body
    
    //run the validation here
    
    try {
        await updateAuthorSchema.validateAsync(authorPayload)
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
        addAuthorValidationMW,
        updateAuthorValidationMW
}