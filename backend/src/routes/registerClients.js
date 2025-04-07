import express from 'express';
import registerClientsController from "../controllers/registerCliesntsController.js";

const router = express.Router();

router.route("/").post((registerClientsController.registerClient));
router.route("/verifyCodeEmail").post(registerClientsController.verifyCodeEmail);

export default router;