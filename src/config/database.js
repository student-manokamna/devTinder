
// const mongoose =require("mongoose");// to get mongoose
// // to connect it with cluster we need a simple querry that is

 //mongoose.connect("mongodb+srv://name:<pasword>@nae.9ucx0.mongodb.net/")
// // this above is not a good way bcz it does not handle after happen after this return a promises 
// means mongoose.connect return a promise so we have to put it async awit func 
// // m-2 is:
// so below is ggod way and when we call afunc then it return promise means it come with .then(connectdb().then)and if connection is done successfully then console that  else if chance of errr then put it in catch so we use .thn and catch for it 
// as .then return a promise na 

// const connectdb = async ()=>{
//     await mongoose.connect(
//         "mongodb+srv://namedev:87URAN@namaode.9ucx0.mongodb.net/devTinder")
// };
// connectdb().then( ()=>{
// console.log("database connection is established!!!")
// }).catch(err=>{
//     console.error("database not handles.....")
// })
/* 
using simple func 
async function connectdb() {
    await mongoose.connect(
        "mongodb+srv://namdev:87lgURAN@namaode.9ucx0.mongodb.net/devTinder"
    );
}
*/

//as abive is not good way bcz here we r lisetening then database is connected what if listen is happening but data is not there so
// write is first connect to database then to listen and in app.js require this file and call it in app.js so that it will be first connect to database then listen to port 

// so what we do ki we export it here before necche vala code and then we import this in app.js and call it(connectdb ko callkrege as first we made successfull connection then it will listen to app) there so that it will be first connect to database then listen to port
// so now we will call this .then and catch in app.js and once connection in database made then after just thatw e listen to it 

const mongoose =require("mongoose");// to get mongoose
 

// to create a newdatabase name devtinder(it is cluster which u see on mongoosecompass)
// mongodb+srv://namastedev:87O3R4lgr9TEURAN@namastenode.9ucx0.mongodb.net tis cluster should be correct bcz devtinder is to  connect to it so it should be correct

const connectdb = async ()=>{
await mongoose.connect(
    "mongodb+srv://maks:XBLXzt@giher1.e2ndgo3.mongodb.net/")
};
module.exports= connectdb;



