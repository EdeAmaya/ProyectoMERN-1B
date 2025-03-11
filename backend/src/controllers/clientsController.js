const clientsController = {};

import clientsModel from "../models/Clients.js";

//Select

clientsController.getClients = async (req,res) => {
  const clients = await clientsModel.find()
  res.json(clients)


};

//Insert

clientsController.insertClients = async (req,res) =>{
    const{name,lastName,birthday,email,password,telephone,dui,isVerified} = req.body;
    const newClients = new clientsModel({ name,lastName,birthday,email,password,telephone,dui,isVerified })
    await newClients.save()
    res.json({message: "client saved"})
};

//Delete

clientsController.deleteClients = async(req,res) =>{
    await clientsModel.findByIdAndDelete(req.params.id);
    res.json({message: "client deleted"})
};

//Update

clientsController.updateClients = async(req,res) =>{
    const {name,lastName,birthday,email,password,telephone,dui,isVerified} = req.body;
    const updateClient = await clientsModel.findByIdAndUpdate(req.params.id,{name,lastName,birthday,email,password,telephone,dui,isVerified},{new: true})
    res.json({message: "client updated"})

}

export default clientsController;