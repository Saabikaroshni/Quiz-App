const express = require("express");
const mdb = require("mongoose");
const dotenv=require('dotenv')
const Signup = require("./models/signupSchema");
const app = express();
const PORT = 3001;
dotenv.config()
app.use(express.json());
mdb
  .connect("mongodb+srv://saabikaroshni:saabi2684@sjitmern2025.mytil.mongodb.net/Trivia-app")
  .then(() => {
    console.log("MBD sucess");
  })
  .catch((err) => {
    console.log("cheack you string", err);
  });

app.get("/", (req, res) => {
  res.send("<h1>welcome back to backend<h1>");
});
app.post("/signup",(req,res)=>{
    try {
        const {firstName,lastName,email,password,phoneNumber}=req.body
    const newSignup=new Signup({
        firstName: firstName,
        lastName: lastName,
        
        password: password,
        email: email,
        phoneNumber: phoneNumber,
        
    });
    newSignup.save()
    console.log("signup sucess")
    res.status(201).json({message:"Signup Successfull",isSignup:true})
        
    } catch (error) {
        res.status(201).json({message:"Signup UnSuccessfull",isSignup:false})
    }

});

app.listen(PORT, () => console.log("server started successfully"));