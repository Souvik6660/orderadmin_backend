const User=require("../models/user.model");
const bcrypt=require('bcryptjs');
const error=require('../middlewares/error.middleware');
const home=async(req,res)=>{
    try {
        res.status(200).send('welcome to home');
    } catch (error) {
        console.log(error);
    }
}


const register=async(req,res)=>{
    try {
const {username,email,phone,password}=req.body;

const userExist =await User.findOne({email});

if(userExist){
    return res.status(400).json({message:"email already exists"});
    }



const userCreated =await User.create({username,email,phone,password});
res.status(201).json({msg:"REGISTRATION SUCCESSFUL",token:await userCreated.generateToken(),userId:userCreated._id.toString()});

    } catch (error) {
        // res.status(500).send('internal server error');
        
        
        // next(error);
       
    }
}



const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user exists
      const userExist = await User.findOne({ email });
      if (!userExist) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Compare the provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, userExist.password);
  
      if (isPasswordValid) {
        const token = await userExist.generateToken();
        return res.status(200).json({
          msg: "LOGIN SUCCESSFUL",
          token: token,
          userId: userExist._id.toString(),
        });
      } else {
        return res.status(401).json({ message: "Invalid Credentials" });
      
    
    }
    } catch (error) {
      console.error("Error during login: ", error); // Log the error for debugging
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  

// user Logic

const user = async (req, res) => {
  try {
    // const userData = await User.find({});
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(` error from user route ${error}`);
  }
};







module.exports={home ,register,login,user}