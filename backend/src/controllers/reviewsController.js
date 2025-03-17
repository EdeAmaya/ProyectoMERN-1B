const reviewsController = {};

import reviewsModels from "../models/Reviews.js"


reviewsController.getReviews = async (req,res) => {
    const reviews = await reviewsModels.find().populate("idCliente")
    res.json(reviews)
  };


  reviewsController.insertReviews = async (req,res) =>{
    const{commet,rating,idCliente} = req.body;
    const newReviews = new reviewsModels({ commet,rating,idCliente })
    await newReviews.save()
    res.json({message: "Review saved"})
};


//Delete

reviewsController.deleteReviews = async(req,res) =>{
    await reviewsModels.findByIdAndDelete(req.params.id);
    res.json({message: "Review deleted"})
};


//Update

reviewsController.updateReviews = async(req,res) =>{
    const { commet,rating,idCliente} = req.body;
    const updateReviews = await reviewsModels.findByIdAndUpdate(req.params.id,{commet,rating,idCliente},{new: true})
    res.json({message: "Reviews updated"})

}



export default reviewsController;