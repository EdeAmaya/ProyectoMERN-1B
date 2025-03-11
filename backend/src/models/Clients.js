import {Schema,model} from "mongoose";

const clientsShema = new Schema({
    name: {
        type: String,
        require: true,
        maxLength:100
    },

    lastName: {
        type: String,
        require: true,
        maxLength:100
    },

    birthday:{
        type:String
    },

    email:{
        type:String
    },

    password:{
        type:String
    },

    telephone:{
        type:String
    },

    dui:{
        type:String
    },

    isVerified:{
        type:Boolean
    }
},{
    timestamps : true,
    strict:false
})

export default model("Clients",clientsShema)