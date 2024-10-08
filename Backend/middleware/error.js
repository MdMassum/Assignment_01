const Errorhandler = require('../utils/errorhandler')      // module for handling error

module.exports =(err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error"

    // wrong mongodb id error i.e if wrong id is passed
    if(err.name === "CastError"){
        const message = `Resource not found, Invalid: ${err.path}`;
        err = new Errorhandler(message,400);
    }

    // mongodb duplicate key error i.e if someone register using email that already exists
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new Errorhandler(message,400)
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}