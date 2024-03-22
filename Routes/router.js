const express = require('express')
const userController = require('../Controllers/userController')
const jwtMiddleware=require("../Middleware/jwtMiddleware")



const router = new express.Router()

//register api (setting the path)
router.post('/register',userController.register)
//login api
router.post('/login',userController.login)


router.get('/get-user-details',userController.getUserDetails)

router.put('/user/edit/:pid',jwtMiddleware,userController.editUser)

router.delete('/remove-user/:pid',jwtMiddleware,userController.removeUser)



module.exports = router