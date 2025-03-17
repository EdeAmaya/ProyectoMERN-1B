import express from "express";
import evaluacionesController from "../controllers/evaluacionesController.js";

const router = express.Router();

router.route("/").get(evaluacionesController.getEvaluaciones)
.post(evaluacionesController.insertEvaluaciones)

router.route("/:id")
.put(evaluacionesController.updateEvaluaciones)
.delete(evaluacionesController.deleteEvaluaciones);

export default router;