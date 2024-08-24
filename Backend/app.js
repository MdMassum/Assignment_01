const express = require('express')
const app = express();
const errorMiddleware = require('./middleware/error')

// route imports
const users = require("./routes/userRoute")

// to access req.body
app.use(express.json());

//available routes
app.use('/api/v1',users);

// middleware for errors
app.use(errorMiddleware)
module.exports = app