// create a express router firslt by reuire it

const express = require("express");

const authRouter = express.Router();   // the way to create router 
// as authrouter is same as app in app.js as const app =express , as both r same as here authrouter = express.router(), here we define authrouter so instead of app.get/post we use authrouter.get/post
// as we define app.use here we define router.use ;

authRouter.post("/signup",async (req,res)=>{

 
    //  const userObj  ={   // aab eska use nhi bcz userobj same hi hh req.body jaise so humne esko hta kr new user k ander req.body lik diya 
    
    //         firstName: "money",
    //         lastName: "arora",
    //         emailId : "money@arora.com",
    //         password: "money@123"
    //     }
    //    validateSignUpData(req);   // lec 22   put this in try catch so eske neeche vala const user bhi abb esme hi ayega bcz we say phle validation then it create instance of it 
    
    try{
        validateSignUpData(req);
        // creating strong password // lec 22
        const {firstName, lastName, emailId,password} = req.body;
        // encrypt password 
        const passwordHash =  await bcrypt.hash(password,10);  // here 10 is saltround
        console.log(passwordHash);
        // const user = new User(req.body);  // as userobj ki jagaj likha bca it is same as req.body
        // the above is a bad practice as to directly pass req.body // (lec-22) so correct way is
        const user = new User({  // as eske nander vo likhe hh jo hume req hh baki sabh ignore ho jauyege jo esme nhi hh 
          firstName,
          lastName,
          emailId,    
          password: passwordHash,
        });
        
      
                await user.save();
                res.send("user added successfully");  
            } catch(err){
                res.status(400).send("error saving the user:"+ err.message);
            }
          });

          authRouter.post("/login", async (req,res)=>{  // lec 22      // lec 24 same take in auth.js 
            try{
           // now for validation we know this login take email and password so first extract these both from req.body
               const {emailId, password} = req.body;
               // do validation ur self 
               const user = await User.findOne({emailId:emailId});
               if(!user){
                 throw new Error("email is not present in db")
               }
               // const  isPasswordValid = await bcrypt.compare(password, user.password) // to commpre first check ki vo email present bhi hh kya db m 
               // above is m-1 ,,,so do ny m-2 is 
               const  isPasswordValid = await user.validatePassword(password)
               if(isPasswordValid){       // lec 22 
               // create jwt token    //  lec 23   toke n({hiding data}, "private/secret key")
               // const token = await jwt.sign({_id: user._id},"DEV@tinder$345",{
               //   expiresIn: "7d",
               // })   // this is rugjt but m-2 is 
               const token =  await user.getJWT();
               //  console.log(token);
                //so we create token now pass it back: neeche 
               // add token to  cokiee and send back to user      // lec 23
               // res.cookie("token", "hhcjchoiwwdw9uknccnckslqdjpqow9udy"); // we sww token cookie on ;postman, this is random only for practice
               //  so pass token here 
               res.cookie("token", token, {
                 expires:new Date(Date.now() + 9*3600000)  
               });    // so now we validate this token in get profile 
         
               res.send("login successful")     // lec 22
              }
              else{
               throw new Error("incorrect password id ")    // lec 22
              }
            }
            catch(err){
             res.status(400).send("smth is wrong ")
         }
               });
               // now create a profile vali in profile.js
               
module.exports = authRouter
