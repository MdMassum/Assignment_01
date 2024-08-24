const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UsersSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Enter Your Name"],
        minLength:[4,"Name should be atleast 4 characters"],
        maxLength:[30,"Name should not exceed 30 characters"],
    },
    email:{
        type:String,
        required:[true,"Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"Enter Your Password"],
        minLength:[6,"Password should be atleast 6 characters"],
        select:false,  // while using find() this will not be selected

    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    
})

UsersSchema.pre("save",async function(next){

    if(!this.isModified("password")){  // if users updates its profile and just change name and email and doesnt modify password then we dont have to hash password again
        next();
    }

    //password hashing
    this.password = await bcrypt.hash(this.password,10);
})

module.exports = mongoose.model('User',UsersSchema);