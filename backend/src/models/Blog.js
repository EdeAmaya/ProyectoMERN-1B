import {Schema,model} from "mongoose";

const blogShema = new Schema({
    title: {
        type: String,
    },

    content: {
        type: String,
    },

    image:{
        type:String
    }
},{
    timestamps : true,
    strict:false
})

export default model("Blog",blogShema)