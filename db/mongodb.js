//import mongoose database library, the config file
const mongoose = require("mongoose")
const CONFIG = require("../config/config")


function dbConnect() {
mongoose.connect(CONFIG.MONGODB_URL)

//testing for the connection when it's connection
mongoose.connection.on("connected", () =>{
    console.log("MongoDB is connected successfully")
})

//testing for connection when there's an error in connection
mongoose.connection.on("error", (err) => {
    console.log("An error occurred")
    console.log(err)
    
})
}


module.exports = dbConnect