const mongoose = require('mongoose')

const connectionString = process.env.CONNECTION_STRING

mongoose.connect(connectionString).then(()=>{
    console.log("MongoDB Atlas conneted succesfully with user Server");
}).catch((reason)=>{
    console.log(reason);
    console.log("MongoDB Connection Failed !!!");
})