require('dotenv').config();

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const CustomerModel = require("./models/Customer")
const app = express()
app.use(express.json())
app.use(cors())



mongoose.connect(process.env.MONGO_URI,{
}).then(()=>{console.log("connect to MongoDB Atlas");})
.catch((err)=>{
    console.log("Error connecting to MongoDB Atlas:", err);
});

app.post('/credential',(req,res)=>{
    const {existingemail,existingpass} = req.body;
    console.log(req.body);
    CustomerModel.findOne({email:existingemail})
    .then(user=>{
        if(user){
            if(user.password === existingpass){
                res.json("Success")
                console.log("Login attempt with email:", existingemail);

            }
            else{
                res.json("Password is incorrect")
                console.log(user.password)
                console.log("Login attempt with email:", existingpass);

            }
        }
        else{
            res.status(401).json("No Record is Existed")
        }
    })
})

app.post('/newregister', (req,res) =>{
    CustomerModel.create(req.body)
    .then(Customer=>res.json(Customer))
    .catch(err =>res.json(err))
})

app.listen(4001,()=>{
    console.log("server is running successfully")
})