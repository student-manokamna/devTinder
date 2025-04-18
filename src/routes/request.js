
const express = require("express");
const mongoose = require("mongoose");
const requestRouter = express.Router();
const {usersAuth} = require("../middlewares/auth")
const ConnectionRequest = require("../models/ConnectionRequest");
const User = require("../models/user.js")
// Define the API Route for Sending Requests
requestRouter.post("/request/send/:status/:toUserId", usersAuth, async (req,res)=>{
  //  as we write: touserid bcz hum req to user ko hi bhej rhe hhh na tou uski id chaie 
  // /request/send/interested/:toUserId instead of only intersted make status dynamic as we wantr both interested and ignored  so make it dynamic by :status 

    try{
       // Check if user is authenticated
    if (!req.user || !req.user._id) {
      throw new Error("User not authenticated");
    }
      const fromUserId = req.user._id;   // Get current user's ID from req.user. bcz req m jo loggin kiya hh uski id mil jayegi or vo hi to from user id hh
      const toUserId= req.params.toUserId; //  Get receiver's ID from URL.as we know when we : then from param we gey id
      const status = req.params.status.toLowerCase();

    //  check status validation that it should either accept or ignore 

    const allowedStatus = ["interested", "ignored"];
    if(!allowedStatus.includes(status)){
      return res.status(400).send("Invalid status", status);
    }
    //  if existing connection exist in connectionrequest
    const existingConnectionRequest =  await ConnectionRequest.findOne({  // it is object
    //  await → Because searching in the database takes time, we wait for the result before moving to the next step.
     $or: [  // this query is made so fast that ki it will return result in 1ms 
        // so herewe use this compund query so that we can check both fromuserid and touserid or compundindexing
      {fromUserId: fromUserId, toUserId: toUserId}, // means aleasy they r present in db 
      {fromUserId: toUserId, toUserId: fromUserId}
     ],
    })
    if(existingConnectionRequest){
      return res.status(400).send("You have already sent a request to this user");
    }
// check touser id valid or not
const touser = await User.findOne({_id:toUserId});
if(!touser){
return res.status(400).json({message: "Invalid User ID"});
}

      if (!mongoose.Types.ObjectId.isValid(toUserId)) {
        throw new Error("Invalid User ID format");
      }
      const connectionRequest= new ConnectionRequest({
        fromUserId:fromUserId,
        toUserId:toUserId,
        status:status

      })
      //  to save this data 
      const data = await connectionRequest.save();
      res.json({
        message: req.user.firstName +" is "+status+" to "+ touser.firstName,
        data,
      }
      )
    }
    catch(err){
      res.status(400).send("ERRROR: "+err.message);
    }
  })
 
requestRouter.post("/request/review/:status/:requestId", usersAuth, async(req,res)=>{
  const loggedInUser = req.user;
  

try{
const {status, requestId}= req.params;

//  here loggedinuser is the user who is logged in and he is reviewing the request so he is the one who is reviewing the request 
//  eg: money=>elon , thnen now elon is reviewing the request so he is the loggedinuser and it handle ki reuest reviw keni hh acdept krno hh ya ignore krna hh
//  as if satuts is ignored then there is no way to take that agian back so we have to handle this
//  request id should be validate 
//  so validate status::


const allowedStatus = ["accepted", "ignored"];
if(!allowedStatus.includes(status)){
  return res.status(400).send("Invalid status", status)
}
}
catch(err){
  res.status(400).send("ERRROR: "+err.message);
}
//  now chwck if requestid is present in db or not , so we checking ur requwatid , person how loggedin and stauts is acceptedor interested
const request= await ConnectionRequest.findOne({
  _id:requestId,   // check if requestid is present in db or not 
  toUserId: loggedInUser._id, // eg like elon is reviewing the request so he is the to user id
  status: "interested"
})
if(!request){
  return res.status(400).send("Invalid Request ID");
}
request.status = status;
 const data = await request.save();
 res.json({message: "connection request"+status,data})

})

module.exports = requestRouter;

//  now create a userroute in routes:user.js



//  here connectionrequestschema is schema in which we have model ConnectionRequest and in wich we have object which is connectionrequest and in which we have 3 fields fromuserid, touserid and status and we have to save this data in connectionrequest model and we have to send this data to the user
//  so we have to create a route for this and we have to create a route for this in request.js file


//  express.Router() → Creates a separate router for handling connection requests.
// ✔ requestRouter will be used to define all request-related routes.

// Hierarchy of Everything 🔥
// 1️⃣ Schema → Defines the structure of data (fields and their types).
// 2️⃣ Model → Uses the schema to interact with MongoDB (like a collection).
// 3️⃣ Object (Document) → A real piece of data (a record inside the database).