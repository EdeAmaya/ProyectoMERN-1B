const productsController = {};

import productsModel from "../models/Products.js";

productsController.getProducts = async (req,res) => {
  const products = await productsModel.find()
  res.json(products)
}

