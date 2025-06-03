const faqsController = {};

import faqsModel from "../models/faqs.js";

//Select

faqsController.getFaqs = async (req,res) => {
    try {
    const faqs = await faqsModel.find()
    res.status(200).json(faqs)

    } 
    
    catch (error) {
        console.error("Error fetching FAQs:", error);
        res.status(400).json({ message: "Internal server error" });
    }
};

//Insert

faqsController.insertFaqs = async (req,res) =>{
    try {
    const{question,answer,level,isActive} = req.body;
    if(level < 1 || level > 5) {
        return res.status(400).json({message: "Ingrese un nivel entre 1 y 5" });
    }
    if(!question || !answer || !level || !isActive) {
        return res.status(400).json({message: "Todos los campos son obligatorios" });
        
    }




    const newFaqs = new faqsModel({ question,answer,level,isActive })
    await newFaqs.save()
    res.json({message: "faqs saved"})
    } 
    
    catch (error) {
        
    }
};

//Delete

faqsController.deleteFaqs = async(req,res) =>{
    await faqsModel.findByIdAndDelete(req.params.id);
    res.json({message: "faqs deleted"})
};

//Update

faqsController.updateFaqs = async(req,res) =>{
    const {question,answer,level,isActive} = req.body;
    const updateFaqs = await faqsModel.findByIdAndUpdate(req.params.id,{question,answer,level,isActive},{new: true})
    res.json({message: "faqs updated"})

}

export default faqsController;