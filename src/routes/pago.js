const express = require("express");
const router = express.Router();
const pagoSchema = require("../models/pagoSchema");
const verifyToken = require('./validate_token');

router.post(
    "/pago", (req, res) => {
        let pago = new pagoSchema(req.body);
        pago.save()
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error }));
    }
);

router.get(
    "/pago", (req, res) => {
        pagoSchema.find()
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error }));
    }
);

router.get(
    "/pago/:id", (req, res) => {
        const { id } = req.params;
        pagoSchema
            .findById(id)
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error }));
    }
);

router.get(
    "/pago/igual/:cantidad", (req,res)=>{
        let { cantidad } = req.params;
        pagoSchema.find({cantidad:{$eq:cantidad}}).then((data)=>res.json(data)).catch((error)=>res.json({message:error}));
    }
);

router.get(
    "/pago/mayor-igual/:cantidad", (req,res)=>{
        let { cantidad } = req.params;
        pagoSchema.find({cantidad:{$gte:cantidad}}).then((data)=>res.json(data)).catch((error)=>res.json({message:error}));
    }
);

router.get(
    "/pago/menor-igual/:cantidad", (req,res)=>{
        let { cantidad } = req.params;
        pagoSchema.find({cantidad:{$lte:cantidad}}).then((data)=>res.json(data)).catch((error)=>res.json({message:error}));
    }
);

router.put(
    "/pago/:id", (req, res) => {
        const { id } = req.params;
        const update = {};
        for (const key in req.body) {
            if (Object.prototype.hasOwnProperty.call(req.body, key)) {
                if (key === "_id") continue; // no permitir cambio de _id
                update[key] = req.body[key];
            }
        }
        if (Object.keys(update).length === 0) {
            return res.status(400).json({ message: "No update data provided" });
        }
        pagoSchema
            .updateOne({ _id: id }, { $set: update })
            .then((data) => {
                // data contiene info sobre matchedCount / modifiedCount según la versión de mongoose
                return res.json(data);
            })
            .catch((error) => res.status(500).json({ message: error }));
    }
);

router.delete(
    "/pago/:id", (req, res) => {
        const { id } = req.params;
        pagoSchema
            .findByIdAndDelete(id)
            .then((data) => {
                res.json(data);
            })
            .catch((error) => {
                res.json({ message: error });
            });
    }
);

module.exports = router;