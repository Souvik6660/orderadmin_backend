const contact=require('../models/contact.model');


const ContactForm=async (req,res)=>{

try{

const response=req.body;
await contact.create(response);
return res.status(200).json({message:"Message Sent Successfully"})


}
catch(error){
    console.log(error);
    return res.status(500).json({message:"message not send"});
}





};

module.exports=ContactForm;