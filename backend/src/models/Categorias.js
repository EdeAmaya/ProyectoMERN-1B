import {Schema,model} from "mongoose";

const categoriaShema = new Schema({
    name: {
        type: String,
    },

    description: {
        type: String,
    },

    status:{
        type:String
    },

    image:{
        type:String
    }
},{
    timestamps : true,
    strict:false
})

export default model("Categorias",categoriaShema)