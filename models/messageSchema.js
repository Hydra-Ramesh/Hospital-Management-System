import mongoose from "mongoose";
import validator from "validator";
import isEmail from "validator/lib/isEmail.js";

const messageSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: [3,"First name must contain at least 3 charecter"]
    },
    lastName:{
        type: String,
        required: true,
        minLength: [3,"First name must contain at least 3 charecter"]
    },
    email:{
        type: String,
        required:true,
        validate:[validator.isEmail,"Please Privide a Valid Email....!"]
    },
    phone:{
        type:String,
        required:true,
        minLength:[10, "Phone number should be atleast 10 digit"],
        maxLength:[13, "Phone number should be at least 10 digit and max 13 digit with +91"],
    },
    message:{
        type: String,
        required:true,
        minLength:[10,"Message length should be atlest 10 words"],
    },

});

export const Message=mongoose.model("Message", messageSchema);