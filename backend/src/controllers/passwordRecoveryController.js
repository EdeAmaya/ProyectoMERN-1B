import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";

import clientsModel from "../models/Clients.js";
import employeeModel from "../models/Employees.js";
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
};

passwordRecoveryController.verifyCode = async (req, res) => {
    const { code } = req.body;
    try {
        const token = req.cookies.tokenRecoveryCode;
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);
        const { email, userType } = decoded;

        if (decoded.code !== code) {
            return res.json({ message: "Invalid code" });
        }

        const newToken = jsonwebtoken.sign(
            {email: decoded.email,
            code: decoded.code, 
            userType: decoded.userType,
            verified: true},

            config.JWT.secret,
            { expiresIn: "25m" }
        );

        res.cookie("tokenRecoveryCode", newToken, {maxAge: 25 * 60 * 1000 });
        res.json({ message: "Code verified" });

     

    } catch (error) {
        console.log("error" + error);
    }
}

passwordRecoveryController.newPassword = async (req, res) => {
    const { newPassword } = req.body;
    try {
        const token = req.cookies.tokenRecoveryCode;
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        if (!decoded.verified) {
            return res.json({ message: "Code not verified" });
        }

        let user;

        const {email} = decoded;

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        if(decoded.userType === "client"){
            user = await clientsModel.findOneAndUpdate(
                { email },
                { password: hashedPassword },
                { new: true }
            );
        }else if(decoded.userType === "employee"){
            user = await employeeModel.findOneAndUpdate(
                { email },
                { password: hashedPassword },
                { new: true }
            );
        }

        res.clearCookie("tokenRecoveryCode");
        res.json({ message: "Password updated" });


    } catch (error) {
        console.log("error" + error);
    }

}

export default passwordRecoveryController;