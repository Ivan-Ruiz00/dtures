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

router.get(
    "/plan/in/:pais",verifyToken,(req,res)=>{
        let { pais } = req.params;
        planSchema.find({pais:{$in:pais}}).then((data)=>res.json(data)).catch((error)=>res.json({message:error}));
    }
);

router.put(
    "/plan/:id", (req, res) => {
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
    "/plan/:id", (req, res) => {
        const { id } = req.params;
        planSchema
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