const User=require("../models/user.model");
const Contact=require("../models/contact.model");
const getAllUsers=async(req,res)=>{

try {
    const users=await User.find({},{password:0});
    console.log(users);
    if(!users || users.length==0){
        return res.status(404).json({message:"No Users Found"});
    }
    return res.status(200).json(users);
} catch (error) {
next(error);    
}



}

const getAllContacts= async(req,res)=>{

    try {
        const contact=await Contact.find();
        console.log(contact);
        if(!contact || contact.length==0){
            return res.status(404).json({message:"No Contact Found"});
        }
        return res.status(200).json(contact);
    } catch (error) {
    next(error);    
    }
    
    
    
    }

const deleteUserById=async(req,res)=>{
    try {
        const id=req.params.id;
        await User.deleteOne({_id:id});
        return res.status(200).json({message: "User Deleted Successfully"}); 
    } catch (error) {
        next(error);
    }
}


//

const getUserById=async(req,res)=>{
    try {
        const id=req.params.id;
       const data= await User.findOne({_id:id},{password:0});
        return res.status(200).json(data); 
    } catch (error) {
        next(error);
    }
}

const updateUserById=async(req,res)=>{


try {
    const id=req.params.id;
    const data1=req.body;
    const updateUser=await User.updateOne({_id:id},{
        $set:data1
    })
    return res.status(200).json(updateUser);
} catch (error) {
    next(error);
}




}








const deleteContactById=async(req,res)=>{
    try {
        const id=req.params.id;
        await Contact.deleteOne({_id:id});
        return res.status(200).json({message: "Contact Deleted Successfully"}); 
    } catch (error) {
        next(error);
    }
}



module.exports={getAllUsers,getAllContacts,deleteUserById,getUserById,updateUserById,deleteContactById};