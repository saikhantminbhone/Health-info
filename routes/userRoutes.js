const express = require('express');
const userController = require('./../controllers/userController')

const userRoutes = express.Router();

userRoutes.post('/createUser', userController.createUser)
userRoutes.get('/getUser',userController.getUser);






module.exports = userRoutes;