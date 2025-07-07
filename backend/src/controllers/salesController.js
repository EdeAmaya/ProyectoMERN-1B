import salesModel from "../models/Sales.js";
const salesController = {};
 
salesController.getAllSales = async (req, res) => {
    try {
        const sales = await salesModel.find();
        res.status(200).json(sales);
    } catch (error) {
        console.error("Error en sales:", error);
        res.status(500).json({ message: "Error al obtener las ventas" });
    }
 
}
 
 
salesController.insertSales = async (req, res) => {
    try {
       const {product, category, customer, total} = req.body;
       
       if(total < 0){
        res.status(400).json({message: "El total no puede ser negativo"});
       }
 
       const newSale = new salesModel({product, category, customer, total});
       
       await newSale.save();
 
       res.status(200).json({message: "Venta registrada correctamente"});
    } catch (error) {
        console.log("error"+error)
        res.status(500).json({ message: "Error al registrar la venta" });
    }
}
 
salesController.deleteSale = async (req, res) => {
    try {
        await salesModel.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Venta eliminada correctamente"});
    } catch (error) {
        console.log("error"+error)
        res.status(500).json({ message: "Error al eliminar la venta" });
    }
}
 
salesController.updateSales = async (req, res) => {
    try {
        const {product, category, customer, total} = req.body;
        if(total < 0){
            res.status(400).json({message: "El total no puede ser negativo"});
           }
 
           await salesModel.findByIdAndUpdate(req.params.id, {product, category, customer, total}, {new: true});
 
           res.status(200).json({message: "Venta actualizada correctamente"});
    } catch (error) {
        console.log("error"+error)
        res.status(500).json({ message: "Error al actualizar la venta" });
    }
}

salesController.getSalesByCategory = async (req, res) => {
    try {
        const resultado = await salesModel.aggregate([
            {
                $group: {
                    _id: "$category",
                    totalSales: { $sum: "$total" },
                    count: { $sum: 1 }
                }
            },

            {
                $sort: { totalSales: -1 } 
            }
        ]);
        res.status(200).json(resultado);

    } catch (error) {
        console.log("error"+error)
        res.status(500).json({ message: "Internal server error" });
    }
 
}


salesController.getTopSellingProducts = async (req, res) => {
    try {
        const resultado = await salesModel.aggregate([
            {
                $group: {
                    _id: "$product",
                    totalSales: { $sum: 1 },
                }
            },
            {
                $sort: { totalSales: -1 } 
            },
            {
                $limit: 5 
            }
        ]);
        res.status(200).json(resultado);

    } catch (error) {
        console.log("error"+error)
        res.status(500).json({ message: "Internal server error" });
    }
}

salesController.getTotalEarnings = async (req, res) => {
    try {
        const resultado = await salesModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalEarnings: { $sum: "$total" }
                }
            }
        ]);
        res.status(200).json(resultado);

    } catch (error) {
        console.log("error"+error)
        res.status(500).json({ message: "Internal server error" });
    }
}

salesController.getFrequentCustomers = async (req, res) => {
    try {
        const resultado = await salesModel.aggregate([
            {
                $group: {
                    _id: "$customer",
                    comprasRealizadas: { $sum: "$total" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { comprasRealizadas: -1 } 
            },
            {
                $limit: 3
            }
        ]);
        res.status(200).json(resultado);

    } catch (error) {
        console.log("error"+error)
        res.status(500).json({ message: "Internal server error" });
    }
}

export default salesController;
 