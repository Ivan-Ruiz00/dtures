const express = require("express");
const router = express.Router();
const planSchema = require("../models/planSchema");
const verifyToken = require("./validate_token");


router.post("/plan", async (req, res) => {
    try {
        console.log("BODY RECIBIDO:", req.body); // 👈 Para ver qué llega desde Angular

        const plan = new planSchema(req.body);
        const savedPlan = await plan.save();

        return res.status(201).json(savedPlan);

    } catch (error) {
        console.error("ERROR AL CREAR PLAN:", error); // 👈 Error real en consola
        return res.status(500).json({
            ok: false,
            message: "Error interno al crear el plan",
            error: error.message
        });
    }
});


router.get("/plan", async (req, res) => {
    try {
        const planes = await planSchema.find();
        return res.json(planes);

    } catch (error) {
        console.error("ERROR AL OBTENER PLANES:", error);
        return res.status(500).json({ message: error.message });
    }
});


router.get("/plan/:id", async (req, res) => {
    try {
        const plan = await planSchema.findById(req.params.id);
        if (!plan) return res.status(404).json({ message: "Plan no encontrado" });

        return res.json(plan);

    } catch (error) {
        console.error("ERROR AL BUSCAR PLAN:", error);
        return res.status(500).json({ message: error.message });
    }
});


router.get("/plan/igual/:pais", async (req, res) => {
    try {
        const data = await planSchema.find({ "destino.pais": req.params.pais });
        return res.json(data);

    } catch (error) {
        console.error("ERROR BUSCANDO POR PAIS:", error);
        return res.status(500).json({ message: error.message });
    }
});


router.get("/plan/in/:pais", verifyToken, async (req, res) => {
    try {
        const pais = req.params.pais.split(","); // acepta varios países
        const data = await planSchema.find({ "destino.pais": { $in: pais } });
        return res.json(data);

    } catch (error) {
        console.error("ERROR BUSCANDO POR IN:", error);
        return res.status(500).json({ message: error.message });
    }
});


router.put("/plan/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const update = {};

        Object.keys(req.body).forEach(key => {
            if (key !== "_id") update[key] = req.body[key];
        });

        const updated = await planSchema.updateOne({ _id: id }, { $set: update });

        return res.json(updated);

    } catch (error) {
        console.error("ERROR AL ACTUALIZAR:", error);
        return res.status(500).json({ message: error.message });
    }
});


router.delete("/plan/:id", async (req, res) => {
    try {
        const deleted = await planSchema.findByIdAndDelete(req.params.id);
        return res.json(deleted);

    } catch (error) {
        console.error("ERROR AL ELIMINAR:", error);
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
