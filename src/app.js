 // first we create a backened in which we take api and create  server 
 //  create a server and you will listen on server means  you were able  to accept incoming request
// //  to create a server (lec 11 krke anna chodq hh maine usme hh server ) which is in folder namste-node 
// // create a server 




// const express = require("express");
 //// create a new application of express.js

// const app = express();   // it means creating a web server using express 
/* now see down when server listen then after that it has to accept incoming request so fir that we use: use (( req(mtlb request), res(mtlb response))=>{now send a res back})

app.use("/",(req,res)=>{
    res.send("Nmaste money");
})

as what is special in above code as when we write above then browswer per kuch bhi likho /hello, /test,/xyz it always givwe nmste money  why so??
this is bcz  jab bhi ye ayega / then it will give nmste money tabhi jab /hello likha tou jaise hi browser ko / dikha phle esne nmste money de diya 
that is why when we write localhost:3000/hello/xyz/123 it give as yes i handle path /hello bcz browser ko phle /hello dikh gya ..but .. localhost:3000/hello123 give as cannot get/hello123 bcz ye condtion match nhi hui na /hello se as both r different 
let if uper vala aap.use ko hum hello k neeche rkh de is squece matter?
yes , squence matter as ager now i write /hello on browser then it print hello vali statement not / this vali bcz / neeche hh hello ke so server k malum nhi hh ki phle ye / aa chuka hh, bcz ye / neeche hh

if we take app.use ("user") es sabh get, post, delete k uper then ye vala ko print ho rhq hh bcz order matter yrr!!! as esko dikh gya ki jaise hi /user aye tou phla vala hi print kr dena that is reason
app.use("/user",(req,res)=>{
    console.log(req.query)  // so when we write http://localhost:3000/user?userId=101 then to get { userId: '101' } we use 
    res.send("order matter bro");
})
similarly i want as  http://localhost:3000/user/2000 ,(this is call as dynamic) then we do so as  */

// in lec-16 we study only about app.use

// app.use("/user/:userId",(req,res)=>{    // can add any dynamic futher also "/user/:userId/:name/:paaword" here : this means it isa dynamic route 
//     console.log(req.params)     
//     res.send({firstname: "hahahhaha", lastname: "noooo"});
// })

// //this will only handle get calls to /user
// app.get("/user", (req,res)=>{
    
//     res.send({firstname: "money", lastname: "chugh"})
// })
// // as here uper get valalikha hua es get vale ko post per daalege tou erro dehga ki not found bcz uper vala hi get ka so post ka chaie so see below code
// // now for post 
// app.post("/user", (req,res)=>{
//     // saving the data to database then sending it
//     res.send("data successfully saved at database");
// })
// // now let say delte krna hh so app.delete bna lo or vaha bhi postman per phle newnode  pe jaker delete http leker save kr lena 
// app.delete("/user",(req,res)=>{
//     res.send("delted successfully");
// })
// // let us explore more
// // as ab?c is there when we write in postmen /abc or /ac it give usthe first and last name 
// app.get("/ab?c",(req,res)=>{
//     res.send({firstname:"naina",lastname:"goo"})
// })
// // see in nb we also use ab+c, and many more 

// // this will match all https method api calls to /test
// app.use("/test",(req,res)=>{    // this whole func call as request handler 
//     res.send("hello from  the server");
// })
// // handle only /hello 
// // app.use((req,res)=>{
// //     res.send("yes i handle the path /hello ");
// // })

// // so now go to browser and check localhost:3000; 
// // now to create a server we have to call a listen with port no. so that connection is made 
// app.listen(3000, ()=>{   // this is also lec-16 starting when app listen to request coming from port 3000 
//     console.log(" server successfully listening  on port no. 3000")
// });   // it also take a callvback func 



// now it is 18 lec in which we study route handler and middle ware

const express = require("express");
const app=  express()
// see m-1 
// app.use("/user",
//     (req,res,next)=>{
//     console.log("hello ji , ho gya success 1");
//     // res.send("1st route handler ji");
//     next();
// },
// (req,res,next)=>{
//     console.log("hello ji , ho gya success 2");
//     res.send("2nd route handler ji");
   
// }
// )
// app.listen(7777,()=>{  
//     console.log("now it is done okay na , happy y r now"); 
// })

// m-2  as for same route we use it in diff lines by define route again

// app.get("/user",(req,res,next)=>{
//     console.log("handling it na !!")
   
//     res.send("okay ji handler 1111");
    
// })
// app.get("/user",(req,res,next)=>{
//     console.log("handle ho gya  !!")
//     res.send("nthg");
//     next();
// })
// app.listen(7777,()=>{  
//     console.log("now it is done okay na , happy y r now"); 
// })



// as it is not easy way to solve it  in forming differnt route and solve it ,  as req is send not directlt first it is authorised then it is send 

// app.get("/admin/alldata",(req,res,next)=>{
//     // logic of checking is req authorised 
//     const token ="xwedfgt";
//     const isAdminAuthorisez =token ==="xyz";
//     if(isAdminAuthorisez){
//         res.send("yes it is");
//     }
//     else{
//         res.status(401).send("unauthorized request");  // as ye status ka mtlb hota hh jaise 404 mtlb not found 401 mtlb unauthorised hh

//     }
// });
// app.get("/admin/deletedata",(req,res,next)=>{
//     // logic of checking is req authorised 
//     const token ="xwedfgt";
//     const isAdminAuthorisez =token ==="xyz";
//     if(isAdminAuthorisez){
//         res.send("yes it is deleted ");
//     }
//     else{
//         res.status(401).send("unauthorized request");  // as ye status ka mtlb hota hh jaise 404 mtlb not found 401 mtlb unauthorised hh

//     }
// });
// app.listen(7777,()=>{  
//     console.log("now it is done okay na , happy y r now"); 
// })

//as this is not good way to write logic of token in all so that why we now study the concept of middleware 
// so we use middleware : so correct way is down :

// app.use("/admin",(req,res,next)=>{
//     const token ="xyz";
//     const isAdminAuthorisez =token ==="xyz";
//     if(!isAdminAuthorisez){
//         res.status(401).send("unauthorized request");  // as ye status ka mtlb hota hh jaise 404 mtlb not found 401 mtlb unauthorised hh
//     }
//     else{
//        next();

//     }
// });

// app.get("/admin/alldata",(req,res)=>{
//      res.send("yes it is");
// });
// app.get("/admin/deletedata",(req,res)=>{
//    res.send("yes it is deleted ");
// });
// app.listen(7777,()=>{  
//     console.log("now it is done okay na , happy y r now"); 
// })
// we dont write this middlewares here so for this we create a folder middlwares and add file  in that 


// const {adminAuth} = require("./middlewares/auth")
// const {userAuth} =require("./middlewares/auth")
// app.use("/admin",adminAuth); // this is middlware and here we use maily app.use so that it is applicable for all 
// app.use("/user",userAuth); // m-1 , m-2 is when single user is present then write as app.get("/user",useAuth, (req,res)=>{  res.send(" i am a user");   })

// // create one more same as admin as user to understand better
// app.get("/user",(req,res)=>{
//     res.send(" i am a user");
// })
// app.get("/admin/alldata",(req,res)=>{
//      res.send("yes it is");
// });
// app.get("/admin/deletedata",(req,res)=>{
//    res.send("yes it is deleted ");
// });
// app.listen(7777,()=>{  
//     console.log("now it is done okay na , happy y r now"); 
// })
// error handlor m-1


// app.get("/getuserdata",(req,res)=>{
//     // logic of db call  and get user data
//     throw new Error("fwjdwi")
//     res.send("user data send");
// })
// app.use("/",(err,req,res,next)=>{
//     if(err){
//         res.status(500).send("somthing went wrong")
//     }
// });
// app.listen(7777,()=>{  
//          console.log("now it is done okay na , happy y r now"); 
//      });


// but best way is  try catch: m-2 

// app.get("/getuserdata",(req,res)=>{
// try{

//     // logic of db call  and get user data
//     throw new Error("fwjdwi")
//     res.send("user data send");
// }


//     catch(err){
//         res.status(500).send("somthing went wrong here ")
//     }
// });
// // at last we write wild error as jab kuch na chle uper tou ye hi chl jaye
// app.use("/", (err,req,res,next)=>{
// if(err){
//     res.status(500).send("somthing mwrong  ")
// }
// })
// app.listen(7777,()=>{  
//          console.log("now it is done okay na , happy y r now"); 
//      });

// lec 19
// first here go to database.js and then come here
// const express = require("express");
// const app=  express()  // ye tou uper likha hua hh eske neeche likhna

// require("./config/database")
// app.listen(7777,()=>{  
//               console.log("now it is done okay na , happy y r now"); 
//       });

// as abive is not good way bcz here we r lisetening then database is connected what if listen is happening but data is not there so
// write is first connect to database then to listen
// .then return promise means jab tk prmise resolev nhi hi jati(indirectly jab tk database connect nhi ho jata hh) tab tk listen nhi hoga so we use .then and catch for it
 
// import
//  const connectdb = require("./config/database")
 //  connectdb()
//  .then( ()=>{
//     console.log("database connection is established!!!")
//     app.listen(7777,()=>{  
//         console.log("now it is done okay na , happy y r now");   //once database establiash then app will listen
// });
//     })
//     .catch(err=>{
//         console.error("database not handles.....")
//     })

// before fetching api createa user schema in models
// now to fetch api or add something to it 


//  const connectdb = require("./config/database")
//  const User = require("./models/user")
//  // to add some data then hhtp method is post : we r creating sign up user 
//  app.post("/signup",async (req,res)=>{
// // create a dummy data
// const userObj  ={
//     firstName: "money",
//     lastName: "arora",
//     emailId : "money@arora.com",`
//     password: "money@123"
// }
// // to save this userobj in our manogodb we have to create a instances of model , as we create a instance of the user model which is already inuser.js and we add this userobj in that model
// // so above firstly require user ;
// const user = new User(userObj); // it means we create a new user with th data in userobj
/* or me say we creating ainstance of user model as it consist new, name of model is User and the data which we need to store in user 
as alag se userobj na bnaker new user ({ k ander userobj vala data daal do })---m-2

await user.save();

 it will save data to database , and it return promise;
remember: most of mongoose func return promises so we have to use await and make a func async;

res.send("user added successfully");  

end a response back
now after this check on mongodb comapss we get our devtinder file is there in which we store our dummy data
now lwts change name money to mano , and baki sabh bhi kr do fir api call kroge or mangodb per dekho ge tou mano vala bhi aa jayega 
as here _id or --v aapne aata hh mongocompass m as ye piche se mongo m define hh and we ad manually also id jaise firstname likha hh 
 */

// // always keep this all in try catch so let us do in that 
// try{
//     await user.save();     //save() returns a promise, so we use await to wait until the data is saved.
//     res.send("user added successfully");  
// } catch(err){
//     res.status(400).send("error saving the user:"+ err.message);
// }
//  })

// so below :
// connectdb() is called
// This connects MongoDB with our Node.js server.
// It returns a promise (either it connects successfully or fails).
// .then(() => {...}) waits for connection
// Then, app.listen(7777, () => {...}) runs.
// The server starts listening on port 7777.
  
//  connectdb()
//  .then( ()=>{
//     console.log("database connection is established!!!")
//     app.listen(7777,()=>{  
//         console.log("now it is done okay na , happy y r now");   //once database establiash then app will listen
// });
//     })
//     .catch(err=>{
//         console.error("database not handles.....")
//     })


// lec 20

// const connectdb = require("./config/database")
//  const User = require("./models/user")
 
//  app.use(express.json()); // this is middlware  as we write middleware for all method of hhtp by using app.use() 
// we need middlware to parse the json data which we send from postman and we pass it so that our server can understand as it convert inot js object whixh is read by our terminal 
// so req.body give us same data which we write in raw body in postman 
// const user = new user(req.bidy) pass this directly bcz in req.body come thatd ata which we write on raw body of postman


//  app.post("/signup",async (req,res)=>{

//  console.log(req.body);
//  });
//  get email id 
// app.get("/user", async (req,res)=>{
//   const useremail= req.body.emailId;
//   //  so hume jo email chiae vo hum req.body u know what it is jo postman per wmail hh vo hh ye so ye email nikal rhe hh

//   try{
//     const users = await User.find({emailId: useremail}); // here it is model.find()

//  as find  return as an array if kuh ayea tou arr m kuch dega vrna return [] sp we check ki legth khali hh tou email nhi mili na
//  and findone return us kuxh hh then ok else return undefined 

//     if(users.length===0){
//       res.status(404).send("smthg wrong user not found")
//     }
//     else{ 
//  res.send(users);

//}
  
//   }catch(err){
//     res.status(401).send("smthg is wrong")
//   }
// })
// //  so write email whoch u wan tto serach in get api /user krke then when u send y get whole information name, email ... all thing in result

// //  now i want /feed api in which i want  to retun all user means jitne bhi presnrt hh dtaabse sare ka sare aa jaye(tou res m sirf user name hi nhi uska pura data ayega jitne maine likhe hh )
// app.get("/feed",async(req,res)=>{
//   try{
//     const alluser = await User.find({}); // empty rkh dena tabhi sabh return hoga
//     res.send(alluser);
//   }catch(err){
//     res.status(401).send("smthg is wrong")
//   }
// })

// //  same we can also use findone in which if we have copy of smae it will return only one 
// //  now how to delete 
// app.delete("/user", async(req,res)=>{
//   const userId = req.body.userId;
//   try{
//     const user = await User.findByIdAndDelete({_id: userId});
//     //  or we write above as 
//     // const user = await User.findByIdAndDelete(userId);
//     res.send("deleted successfully")
//   }catch(err){
//     res.status(401).send("smthg is wrong")
//   }
// })

//  so kya kro poatman per jaker dleete http slect kro and write hhtp:/loca... /user and fir
// eski boy m likho {"userId": "jiski delete krni hh uski id copy krke daal do"}

//  now to update the datta of user use of patch

// app.patch("/user", async(req,res)=>{
//   const userId = req.body.userId;
//   const data=req.body
//   try{
//     const user = await User.findByIdAndUpdate({_id: userId},data,runValidators: true); // it means es user id m jo maine data dalla hh like firstname email jo maine postman per daali hh usko update krna hh means vo updates show krega 
//   //   here u see that userid is not ipdating bcz user id is not userschema
//   //  so whatever is not in user schema that will not update or added if u add smthg new  ..eg like userid not updating
//     res.send("user updated succesfully");
//   }catch(err){
//     res.status(401).send("smthg is wrong")
//   }
// })
//  here dekh userid m koi change nhi ayega bcz it is not in userschema 
//  as is userid kya fayda kya hua fir it means ki es user id per jaker firstanme, gender , enhe update kr do 
//  fir user id kyo dikha bcz id tou present hh na 6736d576be30db262cf0fb47" ye but userid m ye d hh meand update nhi hoga kuch lekin id tou dekhegi na


//  we also have optional thing in it like after and before 
// const user = await User.findByIdAndUpdate({_id: userId},data, {returnDocument:"before"}); 
// console.log(user) it is defautl "before "vala and return before update vala
//  similarly u use "after "here whoch return after update vala 
//  after this runvalidstor vala see neeche in code what more added in patch 

//  connectdb()
//   .then( ()=>{
//      console.log("database connection is established!!!")
//      app.listen(7777,()=>{  
//          console.log("now it is done okay na , happy y r now");   //once database establiash then app will listen
//  });
//      })
//      .catch(err=>{
//          console.error("database not handles.....")
//      })
     

// now let  us take our prev-prev code back

/* const connectdb = require("./config/database")
 const User = require("./models/user")
//  const {validateSignUpData}=require("./utils/validation")   // lec 22 
//  const bcrypt = require("bcrypt");     // lec 22
 const cookieParsel = require("cookie-parser");   // lec 23
 const jwt = require("jsonwebtoken");    // lec 23
 const {usersAuth} = require("./middlewares/auth")  // lec 23  
 // this userauth is added to any api and this make that api very strong
 
 app.use(express.json()); // this is middlware 
 app.use(cookieParsel())  // this is middlware  lec 23 

 */
//  app.post("/signup",async (req,res)=>{       // yaha app.post likha hh or same authrouter define kiya tou vaha authrouter.post likhege  so i am hidng this bcz hum ek m sabh nhi likhte 

 
// //  const userObj  ={   // aab eska use nhi bcz userobj same hi hh req.body jaise so humne esko hta kr new user k ander req.body lik diya 

// //         firstName: "money",
// //         lastName: "arora",
// //         emailId : "money@arora.com",
// //         password: "money@123"
// //     }
// //    validateSignUpData(req);   // lec 22   put this in try catch so eske neeche vala const user bhi abb esme hi ayega bcz we say phle validation then it create instance of it 

// try{
// validation of data 
//     validateSignUpData(req);
//     // creating strong password // lec 22
//  
//     const {firstName, lastName, emailId,password} = req.body;
//  above is ki req.body se vo chije extratc kr rhe hh jo hume require hh 
//     // encrypt password 
//     const passwordHash =  await bcrypt.hash(password,10);  // here 10 is saltround
//     console.log(passwordHash);
//     // const user = new User(req.body);  // as userobj ki jagaj likha bca it is same as req.body
//  so explicity extract which u want like firstname, lastname, emailId, password  and put in model : 
//     // the above is a bad practice as to directly pass req.body // (lec-22) so correct way is
//     const user = new User({  // as eske nander vo likhe hh jo hume req hh baki sabh ignore ho jauyege jo esme nhi hh 
//       firstName,
//       lastName,
//       emailId,    
//       password: passwordHash,
//     });
    
  
//             await user.save();
//             res.send("user added successfully");  
//         } catch(err){
//             res.status(400).send("error saving the user:"+ err.message);
//         }
//       });

//  so postman per likho ye sabh and these 4 chije is required other raise err if we write in this 

      // now create a login   // lec 22
      
      
      
//       app.post("/login", async (req,res)=>{  // lec 22      // lec 24 same take in auth.js 
//    try{
//   // now for validation we know this login take email and password so first extract these both from req.body
//       const {emailId, password} = req.body;
//       // do validation ur self 
//       const user = await User.findOne({emailId:emailId});
//       if(!user){
//         throw new Error("email is not present in db")
//       }
//       // const  isPasswordValid = await bcrypt.compare(password, user.password) // to commpre first check ki vo email present bhi hh kya db m 
//       // above is m-1 ,,,so do ny m-2 is 
//       const  isPasswordValid = await user.validatePassword(password) 
//  or this validatePassoword we use method in userschema so see user.js
//       if(isPasswordValid){       // lec 22 

// once after login - email and password validate then a server give a jwt token which wrap inside cookie
//  so we get this jwt token only after emaila and passwoerd valide so we use here :



//        create jwt token    //  lec 23   toke n({hiding data}, "private/secret key")
//       // const token = await jwt.sign({_id: user._id},"DEV@tinder$345",{
//       //   expiresIn: "7d",
//       // })   // this is rugjt but m-2 is 
//       const token =  await user.getJWT();
// for to cretae token this is 2nd way as first we write above  we use method in userschema so see user.js
//       //  console.log(token);
//        //so we create token now pass it back: neeche 
//        add token to  cokiee and send back to user      // lec 23
// so we send response back with cookie in which jwt token is there so see neeche vala res.cookie( )
//       // res.cookie("token", "hhcjchoiwwdw9uknccnckslqdjpqow9udy"); // we sww token cookie on ;postman, this is random only for practice
//       //  so pass token here 
//       res.cookie("token", token, {
//         expires:new Date(Date.now() + 9*3600000)  
//       });    // so now we validate this token in get profile 

//       res.send("login successful")     // lec 22
//      }
//      else{
//       throw new Error("incorrect password id ")    // lec 22
//      }
//    }
//    catch(err){
//     res.status(400).send("smth is wrong ")
// }
//       });


      
      // as we generate a cookie now to chcek it validation futher let us create a get/profile which take cookie with itself and validate it 
      
      //app.get("/profile", usersAuth, async (req,res)=>{          // create this in another file by see in lec 24
        // try{    // this try is m-1 jab humne code auth.js m nhi likha as jab auth.js m lik diya tou ye same hi hogya na so esko modify krke likhgeg in m-2
        //   const cookies = req.cookies;
          
        // // console.log(cookies);
        //  vslidation of token 
        // const {token} = cookies;
        // if(!token){
        //   throw new Error("invalid error")
        // }
        //  const decodedMessage  = await jwt.verify(token ,"DEV@tinder$345" ) // it contain toke and hideen data
        // const {_id } =decodedMessage;
        // console.log("logged in user is "+_id);   // now verify it by first login and then go to profile 
        // // res.send("read cookies");  .. jab uper vala chlana ho tab ye chelga 

        // // to get the profile back create a user :
        //   const user = await User.findById(_id);
        //   if(!user){
        //     throw new Error("user not exist")
        //   }
        //   res.send(user);   // so now go to profile jo banda login hoga uska data aa jayega 

        // // see as in response we get read cookies means hume vha vokkies mil gyi lekin in console we have undefined bcz humse ye cookies read nhi ho rhi,we r not getting it back here so for this we need a npm library, a middleware that is cookie parsal
        // // so need a cookie-parser , it is also given by express.js , so now insatll it=> npm i cookie-parser 
        // // after insatll import it and write middleware of it is app.use(cookieparsel());
        // }   // above is m-1 
      //   try{
      //     const user = req.user  // se auth.js smj aa jayega neeche likha hh (as do to userauth), dry run it  by eg on postman 
      //     res.send(user);   // so now go to profile jo banda login hoga uska data aa jayega 

        // see as in response we get read cookies means hume vha vokkies mil gyi lekin in console we have undefined bcz humse ye cookies read nhi ho rhi,we r not getting it back here so for this we need a npm library, a middleware that is cookie parsal
        // so need a cookie-parser , it is also given by express.js , so now insatll it=> npm i cookie-parser 
         // after insatll import it and write middleware of it is app.use(cookieparsel());
      //   }
      //   catch(err){
      //     res.status(400).send("ERRROR: "+err.message);
      // }

    //  })


      // see this in request.js in lec 24

      // app.post("/sendConnectionRequest", usersAuth, async (req,res)=>{
      //   // to check ki kis user ne req bheji hh 
      //   const user = req.user ;
      //    // made  connection
      //    console.log("connection is made");
      //   //  res.send("send connection")
      //   res.send( user.firstName+"send connection request!")   // now first go to login then goo to sendconnreq
      // })

      const connectdb = require("./config/database")
      const User = require("./models/user")
     //  const {validateSignUpData}=require("./utils/validation")   // lec 22 
     //  const bcrypt = require("bcrypt");     // lec 22
      const cookieParsel = require("cookie-parser");   // lec 23
      const jwt = require("jsonwebtoken");    // lec 23
      const {usersAuth} = require("./middlewares/auth")  // lec 23  
      // this userauth is added to any api and this make that api very strong
      const cors = require("cors")
      app.use(express.json()); // this is middlware 
      app.use(cookieParsel())  // this is middlware  lec 23 
     app.use(cors())
     
     
      //  lec 24
const authRouter  =require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter= require("./routes/request");
const userRouter = require("./routes/user")

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter)
     
 

    //  ye same hi hh uper likh ayi m 
      // now get user by its email :     // eske neeche vale use nhi hh mere tinder k liye 
      app.get("/user",async (req,res)=>{
const userEmail = req.body.emailId;  // hume email chaie so humne body se req krke emailId li and it is that emailId jo vaha likhi hh postman per 
try{
     const users = await User.find({emailId : userEmail});  // i means it will find that user, whose  emailid which match with it 
    if(users.length===0){
        res.status(404).send("user not found ")
    }
    else{
     res.send(users);
    }
}
catch(err){
    res.status(400).send("smth is wrong ")
}
      });

      // get api : GET/feed - get all user data in database 
      app.get("/feed", async (req,res)=>{
        try{
            const users = await User.find({})  // empty means it will take all users document or data
      res.send(users);
        }
        catch(err){
            res.status(400).send("smth is wrong ")
        }
      })
      // now to delete 
      app.delete("/user",async (req,res)=>{
        const userId = req.body.userId;
        try{
            // const user = await User.findByIdAndDelete({_id: userId})  // m-1 
            const user = await User.findByIdAndDelete(userId)
         res.send("user delted successfully");
        }
        catch(err){
            res.status(400).send("smth is wrong ")
        }
      })
      
      // now to update data
      
      app.patch("/user", async (req,res)=>{
        const userId = req.body.userId;
        const data = req.body;  // the data which we need to update
       
        try{
             // this below some lines r part of lec 21 in which we mentioning that plz req.body if email come dont update it 
        const ALLOWED_UPDATES = ["userId","photoUrl","age","skills","gender","about"] ;
        const isUpdateAllowed = Object.keys(data).every((k)=>  // it means ki ye sare userid, age, skills ye sabh keys  hh or data jo ki uder psotman per hh filhal(req.body m ) so we r saying ki ager every key present hh allowed_uodated vale m then ojk if not then  err through kr do 
        ALLOWED_UPDATES.includes(k)
        //  as why we need to userid in update bcz we need to know which user we r updating
        //  so we define here as
        //  app.patch("/user/:userId, async (req,res)=>{ // WE USE : THIS SOuse of param instead of body
        // const userId = req.param?.userId; 
    );
    
    if(!isUpdateAllowed){
       throw new Error("updated not allow") // as here we r not giving email in main allowed_updates, so it is giving this if cond  
    }
    if(data?.skills.length>10){
        throw new Error("skills cannot be more than 10");
    }
    // bs yaha tk tha 21 vala 
    // below is lec 20
          await User.findByIdAndUpdate({_id: userId}, data,{
            returnDocument: "after",
            runValidators:true, // ye raha validator 
          });
          res.send(" is it updated successfully");
        }
        catch(err) {
            console.error("Error details:", err); // Log the error details
            res.status(400).send("Error saving the user: " + err.message);
        }
      })
 connectdb()
  .then( ()=>{
     console.log("database connection is established!!!")
     app.listen(7777,()=>{  
         console.log("now it is done okay na , happy y r now");   //once database establiash then app will listen
 });
     })
     .catch(err=>{
         console.error("database not handles.....")
     })
     

     // lec -21

     // as pichle lec m humne dekha ki hum kuch bhi data m change kr rhe tou vo change ho rha tha as we want that valid data m hi change aye sara data transfer na ho so hum kuch restricted thing ya func ka use krege 
     // as we r not worry about all the https , as we r worry about mainly post and patch in which we insert data
     // as so even if if putting check in api lest us first put checks in database(means in schema models ), so go to user.js and write some strict code, if this not met we dont insert anything 
     // as we know ki hume req field chaie uske bina user document define nhi hoga , so hum es models m hi phle se kuch ese chije daal de jo ki required hh user ko define krne k liye like its name, email, password (for more see moongose documentation - schema types in it)
     // so user.js m jaker firstname m required= true likh do ager firstname nhi hoga tou moongose will not allow futher insertion 
     // as we aslo see when we login in website if user already exist it thorigh eror ki hh same for eamil we dint use it agian we already login in it , so for that in moongose we have unique:true
     // as we also adding some user information in schema like its photourl, skills ,about... in user.js...as we dos so to enter default : values in it 
     //now lets do eg of this in which we add default value : so create a new user and its password 
     // now solve eg by taking dfault photourl also
     // some user enter emailid in mix upper and lower we want in lower as user write in anything we want that we get in lower so : solve eg 
     // as mongoose treat space email as diff eg "moneyarora.com"  and "  moneyarora.com  " r diff so to make it same use of trim, and also define minlength and maxlength for a name or any other object , for numbers like age we have only min and max   
    // as now to create custom validation func so  eg: in gender we ask about male, female , other so go to user.js (gender)
    // as this validtor work on new doc so to work on updated also use of run validtor in app.js app.patch vale m
    // after add take id of suhani and give gender to it and check it on postman , now also add skills in same and check on compass 
    // how to check a when user has visit / login website mainly we want to check time, day ,date (visit mongoose-timestamps website  ):: add timestaps as 2nd argument in user.js a const userschema = new moongose  vale m start m , solve an eg by take new user document , it will give createdat and updatedat
    // this createdata and updated chabge when we update any value then it time changes than that when we craeted it (patch)
    // as now u know that we can update anything it also may be email but we dont want to update our emails bcz it s not a good thing , so for that w ehave to call our api validation : as we want that it will update certain filds 
    // so all these control in patch(app.patch) so we say to req.body if my email come then dont update it so write something in app.patch :now do eg on this in patch/user
    // as we also dont want to update our userid so for that we do is:
    // app.patch("/user/:userId", async (req,res)=>{
    //     const userId = req.param?.userId;      // and remove userid from ALLOWED_UPDATES
    // baki sabh same hi hh jo uper tha esme bs humne ye user id ko likh diya user k sath 
    // as ager koi hamri skill m likhta hi jaye jiska koi use nhi hh, it is basically for distry our database so for this skills per bhi validation lga do in app.js in try :
    // DATA SANITIZING : add API validation  for each field 
    // as it is diificult to hanle email bcz we have to take in aboy .com , @ , small or big letter , so it is difficult to hanle directly this validtor so we use npm validtor and download it (see google to explore more)
    // so in terminal write : npm i validator and we get this in package json
    // go to user.js and in email write validiate fun , first require validtor , also use validtor for phtoturl, same for password also (for strong password)

    //  as hum alag alg likh rhe thi validtor lga kr user.js m but kyo na hum ek new folder bane src m usme likhe and then pass it as validatesignup vala in main taki
    // hamari main file saaqf rhe vo clean rhe , so create a new folder in src name utils and in that file is validate.js
    // solve all req field validate and then export and import it in app.js
    



    // lec -22 

    // as here we see how password can be store: bcz we cannot store password like money@123 direct in database as it is not ssave or strong password
    // we store password in hash and incrypted format and no one can see password in database , and it is save 
    // as never trust req.body : bcz it conatin data which is coming from api(which is at postman), so we want that our sinup should be save bcz eme koi bhi hacking data daalna assan bcz ye data api se direct aata hh na 
    // so your steps are:
    // 1.  when signup then your first responsibility is first validate your data before creating instance of it 
    // 2. encrypt the password and then store it in database 
    // as for validation we take help of helpers(where we validate our data) so create a new folder in src name utils and in that file is validate.js
  // solve all req field validate and then export and import it in app.js 
  // as esme lastname defien krna postman vali api m bcz vo humne validation m li hh 
   // as ager password m capital,small letter hh , number ya specila char(@#$%..) hh tou vo strong hh ..ye sare hone chai
   // enko encrypted m convert krne k liye we use npm package is npm bcrypt (see offical): this give us hash ur password and validate ur password 
 // more the number of round of saltthe tougher the password is , the more encryption level will bw more the tougher to break it 
 // as we can  also generate salts , as bcrypt.gensalt(see documentation) as here , simple password combine with salts and undergo multiple round to icc encryption and then provide strong password 
 // so write code in app.js in encryption  and console and check it , solve eg on it
 // now we have created a signup , now we create a login to understand it better : do eg of it also 
 


// lec 23 

// so first go through copy
// create a cookie upward 
// create a get/profile 
// send cookie back to user by res.cokkie(name, vlaue,[option]); it is given to us by express so see documentation of 
// visit offical site of jwt.io as jwt consist of (header, payload(in which we hide our secret data), verify signature(it is used to validate the token is it is correct or not ))
// so to create we need a npm library -> npm i jsonwebtoken 
// and we know tokn is created just after we login so go to login api
// so once create a token then validate thisin get/profile
// then to get the eofile back we create a user 
// if someone steal ur cookie then it will get all details of yours ,by steal cookie hacker can fetch all api of login user , but cokie only steal when ur computer is axcess to hacker and when u write js in ur console 
// see login and signup do not need authentication but uske baad valo ko authentication chaie like /profile m tou humne auth set kr hi diya by token as no one access that similally baki sabh jaise /feed vala hogya enme set  krna hh 
// so aab enme auth set krna hh jo ki middleware hh na , we create a auth so to validate the token 
// go to auth.js and write code there , so make usersauth in and then export and import it in app.js 
 // this userauth is added to any api and this make that api very strong
 // how to use it lets take eg:     app.get("/profile",usersAuth, async (req,res)=>{
       // try{eske ander jitna bhi code hh .. include it  }    
       // eska mtlb ki /profile per aane k baad vo usersauth per jayega validate or verify krega token ko ager user verify nhi hua token se give error
       // if match then call next( ) mean ki async(req,res){ } k ander vala code fir chelga ager user verify ho gya token validate ho gya 
        // so simply ki if usersauth not called in middle then ye async vala function/req handlor chelkga hi nhi enko call hi nhi jayegi and it throw error ki user exist hi nhi krta 
        // so jaise phle solve kr rkha hh usko vaise krni k jaruart nhi aaj hum sabh auth define krke aye hh na 
        // so now solve eg on it 
// so profile k neeche saei api co comment kr do as hum nayi bnayege so made  post/sendConnectionRequest  , make this api
// see ager m esme usersAuth use nhi krugi then postman per jab send krege tab ye send ho jayega... lekin ager usersauth use kiya hh tab ye api ya res.send() vala tabhi ayega postman m jab user login hoga,  vrna error dega
// if user is not login then ye nhi chelga ,  
  // so this authentication is vry important bcz without this ur api is not save .. so if you want to et profile, find connec, update, delete then auth is necessry for this
  // so now want that our token expire acc to ur coommand like, 1d,1h or never expire .. so fir this go to login api and move to jwt.sign and write experyin; so it espire token (jwt vala)
  // now to expire cookies we use httponly as it work for http not for https ,   res.cookie("token", token, {expire: .....});
 // now there is study of schema or userschema see form ur nb;



 // lec 24 

 // as we need to make dev tinder then we need diff api which is required mention in applist.md and to represent all api in one is bad practice so we dont represent in single file all apis 
 // so to manage it we create a express router and handle router in proper way; (see express documentation)
 // Express router: so herer we create a group of diff diff apis into small categories and provide them a seperate router to  handle each route 
 // so create a folder routes in src which mange or router handler and in routes create a file auth.js which manages auth vale apis so esme signup,login,logout hh so ye maine app.js m directly bhi likhe hh so enko edhar nhi likhte enko routes m daalo 
 // as authrouter is same as app in app.js as const app =express , as both r same as here authrouter = express.router(), here we define authrouter so instead of app.get/post we use authrouter.get/post
// as we define app.use here we define router.use ;


 
   