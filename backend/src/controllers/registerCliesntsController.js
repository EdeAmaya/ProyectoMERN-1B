import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";

import clientsModel from "../models/Clients.js";
import {config} from "../config.js";

const registerClientsController = {};

registerClientsController.registerClient = async (req, res) => {
    const { name, lastName, birthday, email, password, telephone, dui,isVerified } = req.body;

    try {
        // Check if the email already exists
        const existsClient =  await clientsModel.findOne({ email });
        if (existsClient) {
            return res.json({ message: "Client already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new client
        const newClient = new clientsModel({
            name,
            lastName,
            birthday,
            email,
            password: hashedPassword,
            telephone,
            dui: dui || null,
            isVerified: isVerified || false,
        });+
        // Save the client to the database
        await newClient.save();
        // Generamos un code aleatorio
        const verificationCode = crypto.randomBytes(3).toString('hex');
        // Generamos un token
        const token = jsonwebtoken.sign({ email, verificationCode }, config.JWT.secret, { expiresIn: "2h" });

        res.cookie("verificationToken", token, {maxAge: 2*60*60*1000});

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.email_user,
                pass: config.email.email_pass,
            },
        });

        const mailOptions = {
            from: config.email.email_user,
            to: email,
            subject: "Verificacion de correo",
            text: `Para verificar tu correo, ingresa el siguiente codigo: ${verificationCode}\n El codigo es valido por 2 horas`,
        };

        
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error)  return res.json({ message: "Error sending verification email" });
        console.log("Correo Enviado:", info.response);
    });
    res.json({ message: "Client registered successfully. Verification email sent." });



    } catch (error) {
        res.json({ message: "Error registering client" + error });
        
    }

    
};

registerClientsController.verifyCodeEmail = async (req, res) => {
    const { verificationCode } = req.body;
    const token = req.cookies.verificationToken;

    try {
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);
        const { email, verificationCode: storedCode } = decoded;

        if (verificationCode !== storedCode) {
            return res.json({ message: "Invalid verification code" });
        }
        // Update the client's isVerified field
        const client = await clientsModel.findOne({ email });
        client.isVerified = true;
        await client.save();
        res.json({ message: "Email verified successfully" });
        res.clearCookie("verificationToken");
    } catch (error) {
        res.json({ message: "Error verifying client" + error });
    }
}

export default registerClientsController;
