require('dotenv').config()

const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
require('./DB/connection')

//express server
const pfServer = express()

//use cors in server
pfServer.use(cors())

// json parser (use after cors ,before router) aplication specifiv middileware
pfServer.use(express.json()) 

//available file/folder from server to other app

// pfServer.use('/uploads',express.static('./uploads'))


//use router (only after using cors)
pfServer.use(router)

const PORT = 3000


//to host pfServer : localhost:4000 
pfServer.listen(PORT,()=>{
    console.log(`Project Fair Server Started at port: ${PORT}`);
})

//to resolve get http request to
pfServer.get('/',(req,res)=>{
    res.send("<h1 style=color:brown; > Project Fair Server Started... and waiting for client request </h1>")
})