



const adminMiddleware=async(req,res,next)=>{
try {
    const adminRole=req.user.isAdmin;
    if(!adminRole){
        return res.status(403).json({message:"Access denied !! You are not an Admin."})
    }
    //  req.status(200).json({msg:req.user.isAdmin }); 
    next();
} catch (error) {
    next(error);
}




}
module.exports=adminMiddleware;