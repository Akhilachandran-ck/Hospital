const express=require("express");
require("dotenv").config();


const first=require('./routes/a');

const app=express();
app.use(express.json());

app.use("/hospital",first);


app.get('/',(req,res)=>{
    res.send("Hospital Application");
})



app.listen(4000,()=>{
    console.log("server is listening");
})