//setting up the port 
require("dotenv").config()




//create the environmental variable and export immediately
module.exports = {
    PORT: process.env.PORT,
    MONGODB_URL: process.env.MONGODB_URL
}