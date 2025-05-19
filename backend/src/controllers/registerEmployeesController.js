const registerEmployeesController = {};

import EmployeesModels from "../models/Employees.js"
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import {config} from "../config.js"
import { json } from "express";

registerEmployeesController.insertregisterEmployees = async (req,res) =>{
    const{name, lastname, birthday, email,address,hireDate,password,telephone,dui,isssNumber,isVerified} = req.body;
    try{
        const existEmployee = await EmployeesModels.findOne({email})
        if(existEmployee){
            return res.json({message:"Employee already exists"})
        }

        const passwordHash = await bcryptjs.hash(password, 10);

        const newRegisterEmployees = new EmployeesModels({ name, lastname, birthday, email,address,hireDate,password:passwordHash,telephone,dui,isssNumber,isVerified })
        
        await newRegisterEmployees.save();

        const userType = "Employee";

        jsonwebtoken.sign({id:newRegisterEmployees._id, userType},
            config.JWT.secret,
            {expiresIn:config.JWT.expiresIn},
            
            (error,token)=>{
            if(error) console.log(error);
            res.cookie("authToken",token);
            res.json({message:"Employee registered"})
            }
    )
    }
    catch(error){
        console.log(error);
        return res.json({message:"Error to register employee"})
    }
    
};




export default registerEmployeesController;