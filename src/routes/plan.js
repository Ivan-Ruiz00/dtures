const express = require("express");
const router = express.Router();
const planSchema = require("../models/planSchema");
const verifyToken = require('./validate_token');

router.post(
    "/plan", (req, res) => {
        let plan = new planSchema(req.body);
        plan.save()
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error }));
    }
);

router.get(
    "/plan", (req, res) => {
        planSchema.find()
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error }));
    }
);

router.get(
    "/plan/:id", (req, res) => {
        const { id } = req.params;
        planSchema
            .findById(id)
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error }));
    }
);

router.get(
    "/plan/igual/:pais", (req,res)=>{
        let { pais } = req.params;
        planSchema.find({pais:{$eq:pais}}).then((data)=>res.json(data)).catch((error)=>res.json({message:error}));
    }
);