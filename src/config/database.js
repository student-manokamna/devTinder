
const mongoose =require("mongoose");// to get mongoose
// to connect it with cluster we need a simple querry that is

//mongoose.connect("mongodb+srv://namastedev:87O3R4lgr9TEURAN@namastenode.9ucx0.mongodb.net/")
// this above is not a good way bcz it does not handle after happen after this return a promises 
// m-2 is:

const connectdb = async ()=>{
    await mongoose.connect(
        "mongodb+srv://namastedev:87O3R4lgr9TEURAN@namastenode.9ucx0.mongodb.net/devTinder")
};
connectdb().then( ()=>{
console.log("database connection is established!!!")
}).catch(err=>{
    console.error("database not handles.....")
})

