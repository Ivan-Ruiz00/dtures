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
    "/pago/igual/:cantidad", (req, res) => {
        let { cantidad } = req.params;
        const num = Number(cantidad);
        if (Number.isNaN(num)) return res.status(400).json({ message: "cantidad must be a number" });
        // Buscar el campo anidado transaccion.cantidad (el schema guarda la cantidad ahí)
        pagoSchema
            .find({ "transaccion.cantidad": { $eq: num } })
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error }));
    }
);

router.get(
    "/pago/mayor-igual/:cantidad", (req, res) => {
        let { cantidad } = req.params;
        const num = Number(cantidad);
        if (Number.isNaN(num)) return res.status(400).json({ message: "cantidad must be a number" });
        pagoSchema
            .find({ "transaccion.cantidad": { $gte: num } })
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error }));
    }
);

router.get(
    "/pago/menor-igual/:cantidad", (req, res) => {
        let { cantidad } = req.params;
        const num = Number(cantidad);
        if (Number.isNaN(num)) return res.status(400).json({ message: "cantidad must be a number" });
        pagoSchema
            .find({ "transaccion.cantidad": { $lte: num } })
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error }));
    }
);

router.put(
    "/pago/:id", (req, res) => {
        const { id } = req.params;
        function flatten(obj, parentKey = '', res = {}) {
            for (const [key, value] of Object.entries(obj)) {
                if (key === '_id') continue; // no permitir cambio de _id
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
        pagoSchema
            .findByIdAndUpdate(id, { $set: flat }, { new: true, runValidators: true })
            .then((updated) => {
                if (!updated) return res.status(404).json({ message: 'Pago no encontrado' });
                return res.json(updated);
            })
            .catch((error) => res.status(500).json({ message: error.message || error }));
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