import express from 'express';
import salesController from '../controllers/salesController.js';

const router = express.Router();

router.route("/")
.get(salesController.getAllSales)
.post(salesController.insertSales);

router.route("/:id")
.delete(salesController.deleteSale)
.put(salesController.updateSales);

router.route("/sales-by-category")
.get(salesController.getSalesByCategory);

router.route("/Top-selling-products")
.get(salesController.getTopSellingProducts);

router.route("/total-earnings")
.get(salesController.getTotalEarnings);

router.route("/get-frequent-customers")
.get(salesController.getFrequentCustomers);

export default router;