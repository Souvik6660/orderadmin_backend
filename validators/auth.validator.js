const {z}=require('zod');

const loginSchema=z.object({

    email:z
    .string({required_error:"Email is required"})
.trim()
.email({message:"Invalid email address"}),


password:z
.string({required_error:"password is required"})
.min(8,{message:"Password must be at least 8 characters"})





});








const signupSchema=loginSchema.extend({


    username:z.string({required_error:"Name is required"})
    .trim()
    .min(3,{message:"Name must be atleast 3 characters"}),

   
phone:z
.string({required_error:"Phone no. is required"})
.trim()
.min(10,{message:"phone must be atleast 10 digits"}),







})

module.exports={signupSchema,loginSchema};