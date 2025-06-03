import {Schema,model} from "mongoose";

const faqsShema = new Schema({
    question: {
        type: String,
        require: true,
        minLength: 4,
        trim: true,
    },
    answer: {
        type: String,
        require: true,
        minLength: 4,
        trim: true,
    },
    level: {
        type:Number,
        require: true,
        min: 1,
        max: 5,
        trim: true,
    },
    isActive: {
        type:Boolean,
        default: true,
    },
    
},
{
    timestamps:true,
    strict:false
})

export default model("Faqs",faqsShema)