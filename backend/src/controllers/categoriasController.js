const categoriasController = {};

import categoriasModel from "../models/Categorias.js";

//Select

categoriasController.getCategorias = async (req,res) => {
  const categorias = await categoriasModel.find()
  res.json(categorias)


};

//Insert

categoriasController.insertCategorias = async (req,res) =>{
    const{name,description,status,image} = req.body;
    const newCategorias = new categoriasModel({ name,description,status,image })
    await newCategorias.save()
    res.json({message: "categorias saved"})
};

//Delete

categoriasController.deleteCategorias = async(req,res) =>{
    await categoriasModel.findByIdAndDelete(req.params.id);
    res.json({message: "categorias deleted"})
};

//Update

categoriasController.updateCategorias = async(req,res) =>{
    const {name,description,status,image} = req.body;
    const updateCategorias = await categoriasModel.findByIdAndUpdate(req.params.id,{name,description,status,image},{new: true})
    res.json({message: "categorias updated"})

}

export default categoriasController;