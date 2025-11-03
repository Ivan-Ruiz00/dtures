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

module.exports = router;