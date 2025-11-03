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
        planSchema
            .find({ "destino.pais": { $eq: pais } })
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error }));
    }
);

router.get(
    "/plan/in/:pais", (req, res) => {
        let { pais } = req.params;
        const paisList = pais.split(',').map((p) => p.trim()).filter(Boolean);
        if (paisList.length === 0) return res.status(400).json({ message: 'No pais provided' });
        planSchema
            .find({ "destino.pais": { $in: paisList } })
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error }));
    }
);

router.put(
    "/plan/:id", (req, res) => {
        const { id } = req.params;
        function flatten(obj, parentKey = '', res = {}) {
            for (const [key, value] of Object.entries(obj)) {
                if (key === '_id') continue;
                const prop = parentKey ? `${parentKey}.${key}` : key;
                if (value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
                    flatten(value, prop, res);
                } else {
                    res[prop] = value;
                }
            }
            return res;
        }

        const flat = flatten(req.body);
        if (Object.keys(flat).length === 0) {
            return res.status(400).json({ message: 'No update data provided' });
        }

        planSchema
            .findByIdAndUpdate(id, { $set: flat }, { new: true, runValidators: true })
            .then((updated) => {
                if (!updated) return res.status(404).json({ message: 'Plan not found' });
                return res.json(updated);
            })
            .catch((error) => res.status(500).json({ message: error.message || error }));
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