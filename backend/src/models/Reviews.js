import {Schema,model} from "mongoose";

const reviewsShema = new Schema({
    commet: {
        type: String,
        require: true,
    },

    rating:{
        type:Number,
        require: true,
        max:5,
        min:0
    },

    idCliente:{
        type:Schema.Types.ObjectId,
        ref: "Clients",
        require:true,
    },

},{
    timestamps : true,
    strict:false
})

export default model("Reviews",reviewsShema)