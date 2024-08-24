const User = require('../models/userModel')
const Errorhandler = require('../utils/errorhandler')
const catchAsyncError = require('../middleware/catchAsyncErrors')
const bcrypt = require('bcryptjs')

// creating a user --> 
exports.createUser = catchAsyncError(async(req,res) =>{

    const{name,email,password} = req.body;
    
    let user = await User.create({
        name,email,password,
    });
    const {password:pass, ...rest} = user._doc;  // for removing password field and sending rest 
    res.status(200).json({
        success:true,
        rest
    });
})

// get all users  -->
exports.getAllUser = catchAsyncError(async(req,res,next)=>{
    const users = await User.find();
    const totalResult = await User.countDocuments();
    if(!users){
        return next(new Errorhandler(`No User Exist`,404))
    }
    res.status(200).json({
        success:true,
        totalResult,
        users
    })
})

// get single user Details -->
exports.getSingleUser = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new Errorhandler(`User does not exists with id ${req.params.id}`,404))
    }
    res.status(200).json({
        success:true,
        user
    })
})


// Delete user -->
exports.deleteUser = catchAsyncError(async(req,res,next)=>{

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new Errorhandler(`User does not exists with id ${req.params.id}`,404))
    }
    await User.findByIdAndDelete(user.id)
    res.status(200).json({
        success:true,
        message:"User Deleted Successfully"
    })
})

// update user password -->
exports.updatePassword = catchAsyncError(async(req,res,next)=>{

    const{oldPassword,newPassword,confirmPassword} = req.body;

    //finding the login user details
    const user = await User.findById(req.params.id).select('+password');

    if(!user){
        return next(new Errorhandler(`User does not exists with id ${req.params.id}`,404))
    }

    //comparing password entered -->
    const passComp = await bcrypt.compare(oldPassword,user.password);
    if(!passComp){
        return next(new Errorhandler("Old Password Entered is Incorrect",400));
    }
    if(newPassword != confirmPassword){
        return next(new Errorhandler("Password Mismatch",400))
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
        success:true,
        message:"Password Changed Successfully"
    })
})

// update user profile except password -->
exports.updateUser = catchAsyncError(async(req,res,next)=>{

    const newUser = {
        name:req.body.name,
        email:req.body.email,
    }

    const user = await User.findById(req.params.id);
    if(!user){
        return next(new Errorhandler(`User does not exists with id ${req.params.id}`,404))
    }

    await User.findByIdAndUpdate(req.params.id,newUser,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        message:"Profile Updated Successfully"
    })
})
