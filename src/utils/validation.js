
// here we create all validates of our data
// validate signup data 
const validator =require("validator");
const validateSignUpData = (req)=>{   // req is send from app.js vale post sign up vale and that req come here 
  // now validate req body here , so take out all filds which is required in const{};
  const {firstName , lastName,emailId, password} = req.body;
  // now validate each feild which is req in it

  if(!firstName||!lastName){
    throw new Error("name is not valid!!");
  }
//   else if(firstName.length<2||firstName.length>50){   // ese bhi kr skhte hh nhi tou m-2 hh ki vo jo user.js m kiya hh minlength and maxlength
//   throw new Error("firtsname should be b/w 3 to 50");
//   }  // no need of writing this as this is ahndle by user.js minlength and maxlength vala 

     if(!validator.isEmail(emailId)){
        throw new Error("invalid email adress:");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("ENTER STRONG PASSWORD :"+password);
    }

}

const validateEditProfileData = (req)=>{
  const allowedEditFeilds = [
    "firstName",
    "lastName",
    "emailId",
    "age",
    "about",
    "skills",
    "photoUrl",
    "gender",
  ];
  const isEditAllowed = Object.keys(req.body).every(feild=>
    allowedEditFeilds.includes(feild)
  )
  return isEditAllowed;
}
module.exports = {
validateSignUpData,
validateEditProfileData,
}