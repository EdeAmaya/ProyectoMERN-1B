import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";

import clientsModel from "./models/clientsModel.js";
import employeeModel from "./models/employeeModel.js";

import { sendEmail,HTMLRecoveryEmail } from "../utils/mailPasswordRecovery.js";
import {config} from "../config.js";

const passwordRecoveryController = {};

passwordRecoveryController.sendEmail = async (req, res) => {

const{email} = req.body;
try {
    let userFound;
    let userType;

    userFound = await clientsModel.findOne({ email });
    if (userFound) {
        userType = "client";
    }else{
        userFound = await employeeModel.findOne({ email });
        userType = "employee";
    }

    if (!userFound) {
        return res.json({ message: "User not found" });
    }

    
    const code = Math.floor(100000 + Math.random() * 60000).toString();

    const token = jsonwebtoken.sign(
        { email,code,userType,verfied:false }, 

        config.JWT.secret, 
        
        { expiresIn: "15m" }
    )

    res.cookie("tokenRecoveryCode", token, {maxAge: 25 * 60 * 1000 });

    await sendEmail(
        email,
        "Password Recovery Code",
        `Your verification code is: ${code}`,
        HTMLRecoveryEmail(code)
    )

    res.json({ message: "Verification code send" });

}catch (error) {
    console.log("error" + error);
}
}