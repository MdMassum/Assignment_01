const express = require('express');
const { createUser,
    getSingleUser,
    getAllUser,
    updateUser,
    updatePassword,
    deleteUser } = require('../controllers/userController');

const router = express.Router();

// for creating user -->
router.post('/createUser',createUser)

// for user details -->
router.get('/getUser/:id',getSingleUser)

// for getting all users -->
router.get('/getAllUser',getAllUser)

// for updating user detail -->
router.put('/updateUser/:id',updateUser)

// for updating user password -->
router.put('/updatePassword/:id',updatePassword)

// for updating user profile -->
router.delete('/deleteUser/:id',deleteUser)

module.exports = router;