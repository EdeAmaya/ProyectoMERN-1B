import express from "express";
import categoriasController from "../controllers/categoriasController.js";
const router = express.Router();

router.route("/").get(categoriasController.getCategorias)
.post(categoriasController.insertCategorias)

router.route("/:id")
.put(categoriasController.updateCategorias)
.delete(categoriasController.deleteCategorias)

export default router;