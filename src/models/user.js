
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: String
    },
    gender: {
        type: String
    }
})
// now create a model in which first model name is pass and sec argument is schema name: userschema
// m-1  
// const user =  mongoose.model("User",userSchema)
// module.exports = user;

// m-2 
module.exports =  mongoose.model("User",userSchema)
// .. once u created this u know how user collection or schema looks like 
// now create a first api that will insert the data into the database;
