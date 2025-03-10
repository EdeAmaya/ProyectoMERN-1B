const productsController = {};

import productsModel from "../models/Products.js";

//Select

productsController.getProducts = async (req,res) => {
  const products = await productsModel.find()
  res.json(products)


};

//Insert

productsController.insertProduct = async (req,res) =>{
    const{name,description,price,stock} = req.body;
    const newProduct = new productsModel({ name,description,price,stock })
    await newProduct.save()
    res.json({message: "product saved"})
};

//Delete

productsController.deleteProduct = async(req,res) =>{
    await productsModel.findByIdAndDelete(req.params.id);
    res.json({message: "product deleted"})
};

//Update

productsController.updateProduct = async(req,res) =>{
    const {name,description,price,stock} = req.body;
    const updateProduct = await productsModel.findByIdAndUpdate(req.params.id,{name,description,price,stock},{new: true})
    res.json({message: "product updated"})

}

export default productsController;