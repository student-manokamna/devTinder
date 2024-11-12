  const adminAuth = (req,res,next)=>{
    const token ="xyz";
    const isAdminAuthorisez =token ==="xyz";
    if(!isAdminAuthorisez){
        res.status(401).send("unauthorized request");  // as ye status ka mtlb hota hh jaise 404 mtlb not found 401 mtlb unauthorised hh
    }
    else{
       next();

    }
}

const userAuth = (req,res,next)=>{
    const token = "abc";
    const isUserAuthorized = token ==="abc";
    if(!isUserAuthorized){
        res.status(401).send("not uthorized ");
    }
    else{
        next();
    }
}
module.exports = {
    adminAuth,
    userAuth
}
