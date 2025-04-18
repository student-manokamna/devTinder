//   const adminAuth = (req,res,next)=>{
//     const token ="xyz";
//     const isAdminAuthorisez =token ==="xyz";
//     if(!isAdminAuthorisez){
//         res.status(401).send("unauthorized request");  // as ye status ka mtlb hota hh jaise 404 mtlb not found 401 mtlb unauthorised hh
//     }
//     else{
//        next();

//     }
// }

// const userAuth = (req,res,next)=>{
//     const token = "abc";
//     const isUserAuthorized = token ==="abc";
//     if(!isUserAuthorized){
//         res.status(401).send("not uthorized ");
//     }
//     else{
//         next();
//     }
// }
//module.exports = {
    //     adminAuth,
    //     userAuth
    // }
    
// lec 23 k liye nneche hh:
// it is about how to get auth?? 

const jwt = require("jsonwebtoken");
const User = require("../models/user") // require User 

const  usersAuth = async (req,res,next)=>{
    try{
    // read the token from req.cookies
     const cookies = req.cookies;
    const {token} = cookies  // now extract token form cookies 
    if(!token){
        throw new Error("invalid error")
      }
    // how to verify token 
    const decodedObj = await jwt.verify(token, "DEV@tinder$345")  // firstly extract jwt above 
    // now validate the data
    const {_id} = decodedObj;
    // now find user: means ki check kro jo token de rha hh uska user present hh 
    const user = await User.findById(_id);  
    if(!user){
      throw new Error("user not exist")
    }
     req.user =user; // as ager uper user ki id match ho gyi means ager vo mil gyi uper then us user ko req m pass kr do means req m store kr lo us loggin user ko  
     // as ye user same hume /profile m bhi milta hh so humne yaha se hi user ko req m pass kr diya taki vo app.js m req ki form a jaye and then do next(), 
     // as when we go to app.js we know user is already presnt in req bcz this usersauth already set it so we dont nreed to check again if user is not present then throw err
    next(); //it means move to req handlder again
}
catch(err){
    res.status(400).send("ERRROR: "+err.message);
}
};
// now es userauth ko bhej dona export it
module.exports = {
usersAuth
}
// so humne kya kiya phle login krliya fir /profile per jaker fir send button click kiya tou jis user ne login kiya th ahumare pas uski sari saqri profile aa gyi hh 
// do eg in postman 
