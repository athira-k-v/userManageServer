const { json } = require('express');
const users = require('../Models/userModel')
const jwt = require('jsonwebtoken')


// register
exports.register = async (req, res) => {
    console.log("Inside REGISTER API");
    const { username, email, password } = req.body
    console.log(username, email, password);
    try {
        const existingUser = await users.findOne({ email })
        console.log(existingUser);
        if (existingUser) {
            res.status(406).json("Account already exists...please login !!")
        } else {
            //add user to collection
            const newUser = new users({
                username, email, password
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (err) {
        res.status(401).json(err)
    }
}

//login
exports.login = async (req, res) => {
    console.log("Inside LOGIN API");
    const { email, password } = req.body
    console.log(email, password);
    try {
        const existingUser = await users.findOne({ email, password })
        console.log(existingUser);
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET_KEY)
            res.status(200).json({ existingUser, token })
        } else {
            res.status(404).json("Invalid Email/Password !!!")
        }
    } catch (err) {
        res.status(401).json(err)
    }
}

//update profile

// exports.editUser = async (req, res) => {
//     const userId = req.payload
//     const { username, password, email, github, linkedin, profileImage } = req.body
//     const profile = req.file ? req.file.filename : profileImage

//     try {
//         const updateUser = await users.findByIdAndUpdate({ _id: userId }, {
//             username, email, password, profile, github, linkedin
//         }, { new: true })
//         await updateUser.save()
//         res.status(200).json(updateUser)
//     } catch (err) {
//         res.status(401).json(err)
//     }

// }


exports.getUserDetails=async(req,res)=>{
    try{
    const userDetails=await users.find()
    res.status(200).json(userDetails)
    }catch(err){
    res.status(401).json(err)
    }
    }



    


    
//edit project
// exports.editUser =async (req,res)=>{
//     console.log("Inside edit user");

//     const {pid}= req.params
//     const userId =req.payload
//     const {username,email,password}=req.body
    

//     try{
// const  updatedUser=await users.findByIdAndUpdate({_id:pid},{
//     username,email,password,userId
// },{new:true})

// await updatedUser.save()
// res.status(200).json(updatedUser)
// }catch(err){
//         res.status(401).json(err)
//     }
// }

exports.editUser =async (req,res)=>{
    console.log("Inside edit user");

    const {pid}= req.params
    const userId =req.payload
    const {username,email,password}=req.body

    try{
const  updatedUser=await users.findByIdAndUpdate({_id:pid},{
    username,email,password,userId
},{new:true})

await updatedUser.save()
res.status(200).json(updatedUser)
}catch(err){
        res.status(401).json(err)
    }
}





//remove project
exports.removeUser=async(req,res)=>{
console.log("Inside remove project");
const {pid}=req.params
try{
  const userDetails=await users.findByIdAndDelete({_id:pid})
  res.status(200).json(userDetails)
}catch(err){
  res.status(401).json(err)
}
}


