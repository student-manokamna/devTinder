
const express = require("express");
const { usersAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const connectionRequest = require("../models/ConnectionRequest");

//  get all pending connection requst for loggedin user
//  as userauth is jaruri bcz we have to validate it and further functiion only when it is validated
userRouter.get("/user/requests/received",usersAuth,async (req,res)=>{
    try{
        const loggedInUser = req.user;
        //  get all connectionrequest on loggedinuser
        // find return array while findone return obj
        const connectionRequests = await connectionRequest.find({
         toUserId: loggedInUser._id,
         status: "interested",
        }) // whenwvwe we make call to collection request niw w will populate and we populate fromuserid from ref which conatin user and in user we want fistname ans lastname
        // .populate("fromUserId", ["firstName" ,"lastName"]); m-1 
        .populate("fromUserId", "firstName lastName");  //m-2
        res.json({message : "data fetch succesfully",
            data: connectionRequests,
        })
    }
    catch(err){
        res.status(400).send("ERRROR: "+err.message);
    }
  
})
//  now we study about -GET/user/connections
//  is it will tell us ki aab jaise elon ne acept kr li tou ye  jisne request bheji thi usko btayegi na ki bhai tea connection match ho gya
//  so it tell ki kiske sath aapka connection match ho gya hh 

userRouter.get("/user/connections", usersAuth, async(req,res)=>{
    try{
  const loggedInUser = req.user;
  const connectionRequests= await connectionRequest.find({
    $or:[
        {toUserId: loggedInUser._id, status: "accepted"},
        {fromUserId: loggedInUser._id, status: "accepted"}
    ]
  }).populate("fromUserId", "firstName lastName")  // we need to popultae for touser also so create ref for it also 
  .populate("toUserId", "firstName lastName")
  const data = connectionRequests.map((row)=>{
    if(row.fromUserId._id.tostring()===loggedInUser._id.tostring()){
        return row.toUserId;
    }
    return row.fromUserId;
  });
  res.json({data})
    }catch(err){
res.status(400).send("ERRROR: "+err.message);
    }
})


//  postman per get pe /feed krke bna lena aab 
userRouter.get("/feed", usersAuth, async(req,res)=>{
    try{
//  user should see all the use cards except
//     his own card  
//    cards of users with whom he is already connected
//   cards of users with whom he has already rejected
//   cards of users with whom he has already sent a request

//  so take a login uer
const loggedInUser = req.user;
//  find all the connection request (send and received) for loggedin user

const connectionRequests = await connectionRequest.find({
    $or: [
        {fromUserId: loggedInUser._id},
        {toUserId: loggedInUser._id}
    ]
}).select("fromUserId toUserId  status").populate("fromUserId","firstName lastName" ).populate("toUserId","firstName lastName");
 // Collect all users who are connected or rejected
 const connectedOrRejectedUserIds = connectionRequests.filter(request => 
    request.status === "accepted" || request.status === "rejected"
).map(request => [
    request.fromUserId._id.toString(),
    request.toUserId._id.toString()
]).flat();

// Fetch users who are not the logged-in user, and not in the connected or rejected list
const usersFeed = await User.find({
    _id: { $ne: loggedInUser._id, $nin: connectedOrRejectedUserIds }
}).select("firstName lastName");

res.json({
    message: "Feed data fetched successfully",
    data: usersFeed
});
    }catch(err){
        res.status(400).json({message: err.message});
    }
})
//  i dont want all thing like skill, uodated ... like all i want froma nd to user id 
//  and to show better way bcz it is tough to read this _id so we need instead its anme for both from and to user id 
// to whome u send conneciion request and from whome u get connection request you never show them in field 
//  so there is no need of popoulating loggedin user
module.exports = userRouter;
// then import above above in app.js 



//  infeed we have to remember that for whcih we dont shoe the feed
//  we have to show the feed of all the users with whom we have connection
// means ki ager ek baar connection bna liya tou vo card vapis nhi dekhgena bcz that is laready in interested list
//  2nd if us card ko ignore kr diya tou vo bhi nhi dekhgena fututr m bhi nhi
//  as logggedin user is already in connection list so we have to show all the user except loggedin user
// means  ki logginuser khud ka hi card dubara nhi dekh skhta 

