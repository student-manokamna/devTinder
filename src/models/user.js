
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,          // ye lec 21 m add kiya hh
        minLength: 2,
        maxLength : 50,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,   // ye lec 21 m add kiya hh 
        unique: true,     // same in lec 21 
        lowercase: true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email adress:"+value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("ENTER STRONG PASSWORD :"+value);
            }
        }
    },
    age: {
        type: String,
        min: 18,
    },
    gender: {
        type: String,
       validate(value){   // this valide will only run we create a new document means new name, email sabh tab ye work or if we dom patch (in which updation occur) then it will not work as if in updation vale m we add gender "hello " then it print that also bcz it is updted data not new document 
  if(!["male","female","other"].includes(value)){  // so we use runvalidtor  in app.patch vale m jisme update value bhi validate vale k bahar gender nhi legi 
    throw new Error("gender data  is not valid");
  }
       },
    },
    photoUrl:{
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQABqQIdskCD9BK0I81EbVfV9tTz320XvJ35A&s",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("invalid photo url adress:"+value);
            }
        }
    },
    about:{
        type: String,
        default: "this is default about user"    // as it take or here enter any default value acc to user 
    },
    skills:{
        type: [String]   // as it contain many skills so it is arr of string

    }
},
{
    timestamps: true,
})
// lec 23 
userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({_id: user._id},"DEV@tinder$345",{
        expiresIn: "7d",
      });
      return token;
    
};
// now solve method for validation...
userSchema.methods.validatePassword = async function(passwordInputbyUser){
    const user = this ;
    const passwordHash = user.password;

    const isPasswordValid =  await bcrypt.compare(passwordInputbyUser , passwordHash);
    return isPasswordValid;

} ;

// now create a model in which first model name is pass and sec argument is schema name: userschema
// m-1  
// const user =  mongoose.model("User",userSchema)
// module.exports = user;

// m-2 
module.exports =  mongoose.model("User",userSchema)
// .. once u created this u know how user collection or schema looks like 
// now create a first api that will insert the data into the database;
