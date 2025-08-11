const loginController = {};

import EmployeesModels from "../models/Employees.js"
import ClientsModels from "../models/Clients.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import {config} from "../config.js"
import e, { json } from "express";

const maxAttempts = 3;
const lockTime  = 15 * 60 * 1000




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


    if(userType !== "Admin"){
        if(userFound.lockTime > Date.now()){
           const minutosRestantes = Math.ceil((userFound.lockTime - Date.now()) / (1000 * 60));
           return res.json({message:`Cuenta Bloqueada. Por favor espera ${minutosRestantes} minutos.`})
        }
    }



    if(userType !=="Admin"){
        const isMatch = bcryptjs.compare(password,userFound.password);
        if(!isMatch){
            userFound.loginAttempts = userFound.loginAttempts + 1

            if(userFound.loginAttempts > maxAttempts){
                userFound.lockTime = Date.now() + lockTime;     
                await userFound.save()
                return res.status(403).json({message:`Has excedido el numero de intentos. Por favor espera 15 minutos.`})
            }
            await userFound.save()
            return res.json({message:"Incorrect password"})
        }

        userFound.loginAttempts = 0;
        userFound.lockTime = null;
        await userFound.save(); 
    }

    jsonwebtoken.sign({id:userFound._id},config.JWT.secret,{expiresIn:config.JWT.expiresIn},(error,token)=>{
        if(error) console.log(error);
        
        res.cookie("authToken",token);
        res.json({message: `${userType} login successful`, token })
        
    })
 }
  catch(error){
    console.log(error);
    return res.json({message:"Error to login"})
  }
  
};


export default loginController;