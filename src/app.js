// // first we create a backened in which we take api and create  server 
// //  create a server and you will listen on server means  you were able  to accept incoming request
// //  to create a server (lec 11 krke anna chodq hh maine usme hh server )
// // create a server 

// const express = require("express");
// // create a new application of express.js

// const app = express();   // it means creating a web server using express 
// // now see down when server listen then after that it has to accept incoming request so fir that we use: use (( req(mtlb request), res(mtlb response))=>{now send a res back})

// // app.use("/",(req,res)=>{
// //     res.send("Nmaste money");
// // })

// // as what is special in above code as when we write above then browswer per kuch bhi likho /hello, /test,/xyz it always givwe nmste money  why so??
// // this is bcz  jab bhi ye ayega / then it will give nmste money tabhi jab /hello likha tou jaise hi browser ko / dikha phle esne nmste money de diya 
// // that is why when we write localhost:3000/hello/xyz/123 it give as yes i handle path /hello bcz browser ko phle /hello dikh gya ..but .. localhost:3000/hello123 give as cannot get/hello123 bcz ye condtion match nhi hui na /hello se as both r different 
// // let if uper vala aap.use ko hum hello k neeche rkh de is squece matter?
// // yes , squence matter as ager now i write /hello on browser then it print hello vali statement not / this vali bcz / neeche hh hello ke so server k malum nhi hh ki phle ye / aa chuka hh, bcz ye / neeche hh

// // if we take app.use ("user") es sabh get, post, delete k uper then ye vala ko print ho rhq hh bcz order matter yrr!!! as esko dikh gya ki jaise hi /user aye tou phla vala hi print kr dena that is reason
// // app.use("/user",(req,res)=>{
// //     console.log(req.query)  // so when we write http://localhost:3000/user?userId=101 then to get { userId: '101' } we use 
// //     res.send("order matter bro");
// // })
// // similarly i want as  http://localhost:3000/user/2000 ,(this is call as dynamic) then we do so as 
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
// app.listen(3000, ()=>{
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
// app.use("/admin",adminAuth);
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

// const express = require("express");
// const app=  express()  // ye tou uper likha hua hh eske neeche likhna

// require("./config/database")
// app.listen(7777,()=>{  
//               console.log("now it is done okay na , happy y r now"); 
//       });

// as abive is not good way bcz here we r lisetening then database is connected what if listen is happening but data is not there so
// write is first connect to database then to listen

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

// npw to fetch api or add something to it 


//  const connectdb = require("./config/database")
//  const User = require("./models/user")
//  // to add some data then hhtp method is post : we r creating sign up user 
//  app.post("/signup",async (req,res)=>{
// // create a dummy data
// const userObj  ={
//     firstName: "money",
//     lastName: "arora",
//     emailId : "money@arora.com",
//     password: "money@123"
// }
// // to save this userobj in our manogodb we have to create a instances of model , as we create a instance of the user model which is already inuser.js and we add this userobj in that model
// // so above firstly require user ;
// const user = new User(userObj); // it means we create a new user with th data in userobj
// //or me say we creating ainstance of user model as it consist new, name of model is User and the data which we need to store in user 
// // as alag se userobj na bnaker new user ({ k ander userobj vala data daal do })---m-2

// // await user.save();

//  // it will save data to database , and it return promise;
// // remember: most of mongoose func return promises so we have to use await and make a func async;

// // res.send("user added successfully");  

// // end a response back
// // now after this check on mongodb comapss we get our devtinder file is there in which we store our dummy data
// // now lwts change name money to mano , and baki sabh bhi kr do fir api call kroge or mangodb per dekho ge tou mano vala bhi aa jayega 
// // as here _id or --v aapne aata hh mongocompass m as ye piche se mongo m define hh and we ad manually also id jaise firstname likha hh 


// // always keep this all in try catch so let us do in that 
// try{
//     await user.save();
//     res.send("user added successfully");  
// } catch(err){
//     res.status(400).send("error saving the user:"+ err.message);
// }
//  })

  
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
 
//  app.use(express.json()); // this is middlware 
//  app.post("/signup",async (req,res)=>{

//  console.log(req.body);
//  });
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

const connectdb = require("./config/database")
 const User = require("./models/user")
 
 app.use(express.json()); // this is middlware 
 app.post("/signup",async (req,res)=>{

 
//  const userObj  ={   // aab eska use nhi bcz userobj same hi hh req.body jaise so humne esko hta kr new user k ander req.body lik diya 

//         firstName: "money",
//         lastName: "arora",
//         emailId : "money@arora.com",
//         password: "money@123"
//     }
    const user = new User(req.body);  // as userobj ki jagaj likha bca it is same as req.body
    try{
            await user.save();
            res.send("user added successfully");  
        } catch(err){
            res.status(400).send("error saving the user:"+ err.message);
        }
      });
      // now get user by its email : 
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
          await User.findByIdAndUpdate({_id: userId}, data,{
            returnDocument: "after",
            runValidators:true,
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
    

    