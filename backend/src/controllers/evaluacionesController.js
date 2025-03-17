const evaluacionesController = {};

import evaluacionesModel from "../models/Evaluaciones.js";

//Select

evaluacionesController.getEvaluaciones = async (req,res) => {
  const evaluaciones = await evaluacionesModel.find().populate("idEmpleado")
  res.json(evaluaciones)


};

//Insert

evaluacionesController.insertEvaluaciones = async (req,res) =>{
    const{comment,grade,role,idEmpleado} = req.body;
    const newEvaluaciones = new evaluacionesModel({ comment,grade,role,idEmpleado })
    await newEvaluaciones.save()
    res.json({message: "Evaluaciones saved"})
};

//Delete

evaluacionesController.deleteEvaluaciones = async(req,res) =>{
    await evaluacionesModel.findByIdAndDelete(req.params.id);
    res.json({message: "Evaluaciones deleted"})
};

//Update

evaluacionesController.updateEvaluaciones = async(req,res) =>{
    const {comment,grade,role,idEmpleado} = req.body;
    const updateEvaluaciones = await evaluacionesModel.findByIdAndUpdate(req.params.id,{comment,grade,role,idEmpleado},{new: true})
    res.json({message: "Evaluaciones updated"})
}

export default evaluacionesController;