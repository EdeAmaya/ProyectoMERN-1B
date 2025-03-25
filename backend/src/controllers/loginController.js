const loginController = {};

import EmployeesModels from "../models/Employees.js"
import ClientsModels from "../models/Clients.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import {config} from "../config.js"
import e, { json } from "express";

loginController.login = async (req,res) =>{
  const {email,password} = req.body;
  
  try{
   let userFound;
   let userType;
   
   if(email === config.emailAdmin.email && password === config.emailAdmin.password){
     userFound = {_id : "Admin"}
     userType = "Admin"
     
   }
   else{
     userFound = await EmployeesModels.findOne({email});
     userType = "Employee"

    if(!userFound){
    userFound = await ClientsModels.findOne({email});
    userType = "Client"
    }
   }

    if(!userFound){
     return res.json({message:"User not found"})
    }

    if(userType !=="Admin"){
        const isMatch = bcryptjs.compare(password,userFound.password);
        if(!isMatch){
            return res.json({message:"Incorrect password"})
        }
    }

    jsonwebtoken.sign({id:userFound._id},config.JWT.secret,{expiresIn:config.JWT.expiresIn},(error,token)=>{
        if(error) console.log(error);
        res.cookie("authToken",token);
        res.json({message:"User logged in"})
        
    })
 }
  catch(error){
    console.log(error);
    return res.json({message:"Error to login"})
  }
  
};


export default loginController;