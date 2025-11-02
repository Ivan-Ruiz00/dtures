const express= require("express");
const router=express.Router();
const pagoSchema=require("../models/pago");
const verifyToken = require('./validate_token');

router.post("/pago",verifyToken, (req,res)=>{
    let pago=new pagoSchema(req.body);
    pago.save()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}));
});

module.exports=router;