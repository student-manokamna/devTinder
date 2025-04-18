/* use of ref is 
fromUserId: This stores the ID of the user who is sending the request.
It is an ObjectId type, referencing the User collection (like a foreign key).
ref: 'User' lets you later use .populate() to fetch full user info from User collection.
status: Current status of the connection request.
It’s a required string and must be one of the listed values (enum) only.
If someone enters a wrong status like "maybe", they'll get an error like maybe is not supported.
.populate()	Mongoose magic that replaces the ID with the full user document
 */
const mongoose = require('mongoose');
const connectionRequestSchema = new mongoose.Schema({
fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // means now creating reference to user collection 
    },
    toUserId: {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    status:{
        type: String,
        required: true,
        enum:{
            values: ["ignored", "interested","acceepted", "rejected"],
            message: `{value} is not supported`
        }
    }
},
{timestamps: true}
);

connectionRequestSchema.index({fromUserId:1, toUserId:1});   //This makes sure that a user can only send one request to another specific user (no duplicate requests).
 /*  pre come before we save data in DB 
Before saving the connection request to the database, this function runs.
It checks if fromUserId and toUserId are the same — means user trying to connect with themselves.
If true: ❌ Throw error: "You cannot send request to yourself"
If false: ✅ Continue to save.
This function will run automatically before saving any new ConnectionRequest document into the MongoDB database.

*/
connectionRequestSchema.pre("save", function(next){
const connectionRequest = this;
//  check id from and to userid same 
if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    return next(new Error("You cannot send request to yourself"));
}
next()
})
/* 
This is a pre-save middleware in Mongoose.
🧠 Meaning:
This function will run automatically before saving any new ConnectionRequest document into the MongoDB database.
 "save" → the middleware hook name
"save" means:

This function will run before the .save() method is called on a document.

It’s tied to Mongoose's document lifecycle.

Other hooks can be "validate", "remove", "updateOne" etc., but here it's "save".

2️⃣ function (next) { ... } → the middleware function
This function runs just before saving the document to the DB.

next() is a callback function — you must call it to proceed to the actual .save().

🧠 What is this here?
Inside pre("save"), this refers to the document being saved.
 "save" → the middleware hook name
"save" means:

This function will run before the .save() method is called on a document.

It’s tied to Mongoose's document lifecycle.

Other hooks can be "validate", "remove", "updateOne" etc., but here it's "save".

2️⃣ function (next) { ... } → the middleware function
This function runs just before saving the document to the DB.

next() is a callback function — you must call it to proceed to the actual .save().

🧠 What is this here?
Inside pre("save"), this refers to the document being saved.
If you console.log(this) inside the pre("save"), you will see the full document including _id, status, etc.
.save is coming from->
const req = new ConnectRequestModel({
  fromUserId: "...",
  toUserId: "...",
  status: "interested"
});
await req.save(); // <--- this is where .save() is coming from!
means pre vala .save() se phle call hoga 
"Whenever .save() is called on this model, run this function first (before actually saving to DB)."
this refers to the document you are about to save — always.
So even before condition is checked, this is already set.
So this document (this) is automatically passed into the function, whether the condition passes or fails.

TL;DR Summary
.save() is a method on document instances created from a model.
.pre("save") lets you hook into that save and run custom logic.
Inside that hook, this refers to the current document — always.
Condition is used to validate or block the save.
If condition passes → next() lets the save continue. this next is last vala
next() is a callback function provided by Mongoose.
You must call it inside middleware to tell Mongoose:
“I’m done with the pre-save logic, you can now continue with .save().”
Because without calling next(), Mongoose will think you're still doing something and will never move forward to save the document.
*/


const ConnectRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema);
module.exports = ConnectRequestModel;

