
const express = require("express");



const profileRouter= express.Router();
const {usersAuth} = require("../middlewares/auth")
  const {validateEditProfileData} = require("../utils/validation");
  const User = require("../models/user");

profileRouter.get("/profile/view", usersAuth, async (req,res)=>{          // create this in another file by see in lec 24
       
        try{
            const user = req.user  // se auth.js smj aa jayega neeche likha hh (as do to userauth), dry run it  by eg on postman 
            res.send(user);   // so now go to profile jo banda login hoga uska data aa jayega 
  
          
          }
          catch(err){
            res.status(400).send("ERRROR: "+err.message);
        }
  
        })
        // create a profile/edit
        profileRouter.patch("/profile/edit",usersAuth, async(req,res)=>{
          try{  
            if(!validateEditProfileData(req) ){         // now write this func in utils 
              throw new Error("invalid edit req")
            }  
            const loggedIn = req.user;
            console.log("Logged-in User:", loggedIn );//This log tells us who is making the request.
        console.log("Request Body:", req.body);//This log tells us what data the user wants to update.
        
        if (!loggedIn) {
          throw new Error("User is not logged in or req.user is undefined");
      }
        
        Object.keys(req.body).forEach((key)=>loggedIn[key]= req.body[key]);
        console.log(loggedIn)
        
        await loggedIn.save()

        // res.send(`${loggedIn.firstName}, ur profile updated `); this si not good way so: we doa s
        res.json({message: `${loggedIn.firstName}, ur profile updated `,
        data: loggedIn,
        })
          }
          catch(err){
            res.status(400).send("ERRROR: "+err.message);
        }
        })

module.exports = profileRouter;


// http://localhost:7777/request/send/:status/:toUserId
