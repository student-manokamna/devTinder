// first we create a backened in which we take api and create  server 
//  create a server and you will listen on server means  you were able  to accept incoming request
//  to create a server (lec 11 krke anna chodq hh maine usme hh server )
// create a server 

const express = require("express");
// create a new application of express.js

const app = express();   // it means creating a web server using express 
// now see down when server listen then after that it has to accept incoming request so fir that we use: use (( req(mtlb request), res(mtlb response))=>{now send a res back})
app.use("/test",(req,res)=>{    // this whole func call as request handler 
    res.send("hello from  the server");
})
// handle only /hello 
app.use((req,res)=>{
    res.send("yes i handle the path /hello ");
})
// so now go to browser and check localhost:3000; 
// now to create a server we have to call a listen with port no. so that connection is made 
app.listen(3000, ()=>{
    console.log(" server successfully listening  on port no. 3000")
});   // it also take a callvback func

