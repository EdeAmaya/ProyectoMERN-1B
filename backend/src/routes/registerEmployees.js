import express from "express";
import loginController from "../controllers/loginController.js";
const router = express.Router();

router.route("/").post(loginController.insertlogin)

export default router;