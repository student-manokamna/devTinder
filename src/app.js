// first we create a backened in which we take api and create  server 
//  create a server and you will listen on server means  you were able  to accept incoming request
//  to create a server (lec 11 krke anna chodq hh maine usme hh server )
// create a server 

const express = require("express");
// create a new application of express.js

const app = express();   // it means creating a web server using express 
// now see down when server listen then after that it has to accept incoming request so fir that we use: use (( req(mtlb request), res(mtlb response))=>{now send a res back})

// app.use("/",(req,res)=>{
//     res.send("Nmaste money");
// })

// as what is special in above code as when we write above then browswer per kuch bhi likho /hello, /test,/xyz it always givwe nmste money  why so??
// this is bcz  jab bhi ye ayega / then it will give nmste money tabhi jab /hello likha tou jaise hi browser ko / dikha phle esne nmste money de diya 
// that is why when we write localhost:3000/hello/xyz/123 it give as yes i handle path /hello bcz browser ko phle /hello dikh gya ..but .. localhost:3000/hello123 give as cannot get/hello123 bcz ye condtion match nhi hui na /hello se as both r different 
// let if uper vala aap.use ko hum hello k neeche rkh de is squece matter?
// yes , squence matter as ager now i write /hello on browser then it print hello vali statement not / this vali bcz / neeche hh hello ke so server k malum nhi hh ki phle ye / aa chuka hh, bcz ye / neeche hh

// if we take app.use ("user") es sabh get, post, delete k uper then ye vala ko print ho rhq hh bcz order matter yrr!!! as esko dikh gya ki jaise hi /user aye tou phla vala hi print kr dena that is reason
// app.use("/user",(req,res)=>{
//     console.log(req.query)  // so when we write http://localhost:3000/user?userId=101 then to get { userId: '101' } we use 
//     res.send("order matter bro");
// })
// similarly i want as  http://localhost:3000/user/2000 ,(this is call as dynamic) then we do so as 
app.use("/user/:userId",(req,res)=>{    // can add any dynamic futher also "/user/:userId/:name/:paaword" here : this means it isa dynamic route 
    console.log(req.params)     
    res.send({firstname: "hahahhaha", lastname: "noooo"});
})

//this will only handle get calls to /user
app.get("/user", (req,res)=>{
    
    res.send({firstname: "money", lastname: "chugh"})
})
// as here uper get valalikha hua es get vale ko post per daalege tou erro dehga ki not found bcz uper vala hi get ka so post ka chaie so see below code
// now for post 
app.post("/user", (req,res)=>{
    // saving the data to database then sending it
    res.send("data successfully saved at database");
})
// now let say delte krna hh so app.delete bna lo or vaha bhi postman per phle newnode  pe jaker delete http leker save kr lena 
app.delete("/user",(req,res)=>{
    res.send("delted successfully");
})
// let us explore more
// as ab?c is there when we write in postmen /abc or /ac it give usthe first and last name 
app.get("/ab?c",(req,res)=>{
    res.send({firstname:"naina",lastname:"goo"})
})
// see in nb we also use ab+c, and many more 

// this will match all https method api calls to /test
app.use("/test",(req,res)=>{    // this whole func call as request handler 
    res.send("hello from  the server");
})
// handle only /hello 
// app.use((req,res)=>{
//     res.send("yes i handle the path /hello ");
// })

// so now go to browser and check localhost:3000; 
// now to create a server we have to call a listen with port no. so that connection is made 
app.listen(3000, ()=>{
    console.log(" server successfully listening  on port no. 3000")
});   // it also take a callvback func

