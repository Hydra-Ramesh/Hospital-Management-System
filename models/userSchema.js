import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchemaSchema = new mongoose.Schema({
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
    nic:{
        type: String,
        required:true,
        minLength:[13, "NIC should be atleast 13 digit..!!"],
        maxLength:[13, "NIC should be exact 13 digit..!!"],
    },
    dob:{
        type: Date,
        required:[true,"Date of birth is required"],
    },
    gender:{
        type: String,
        required:true,
        enum:["Male", "Female", "Other"],
    },
    password:{
        type: String,
        required: true,
        minLength:[8,"Password must be atleast 8 charecter long"],
        select:false,
    },
    role:{
        type: String,
        required:true,
        enum:["Admin", "Patient", "Doctor"],
    },
    doctorDepartment:{
        type: String,
    },
    docAvtar:{
        public_id:String,
        url:String,
    },

});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password, salt);
    next();
});


userSchema.method.comparePassword=async function(enteredPassword){
    const isMatch=await bcrypt.compare(enteredPassword, this.password);
    return isMatch;
};

userSchema.method.generateJsonWebToken=function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRES,
    });
}
export const User=mongoose.model("User", userSchema);