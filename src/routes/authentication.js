const express = require("express");
const router = express.Router(); 
const userSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
    const { usuario, correo, clave, rol } = req.body;
    const user = new userSchema({
        usuario: usuario,
        correo: correo,
        clave: clave,
        rol: rol,
    });
    user.clave = await user.encryptClave(user.clave);
    await user.save(); 
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24, 
    });
    res.json({
        auth: true,
        token,
    });
});


router.post("/login", async (req, res) => {
    try {
        
        const user = await userSchema.findOne({ correo: req.body.correo });

        if (!user)
            return res.status(400).json({ error: "Usuario no encontrado" });

       
        const validPassword = await bcrypt.compare(req.body.clave, user.clave);
        if (!validPassword)
            return res.status(400).json({ error: "Clave no válida" });

       
        const token = jwt.sign(
            { id: user._id },
            process.env.SECRET,
            { expiresIn: 60 * 60 * 24 } // 1 día
        );


        return res.json({
            auth: true,
            accessToken: token,
            user: {
                nombre: user.usuario,
                correo: user.correo,
                rol: user.rol
            }
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Error en el servidor" });
    }
});


module.exports = router;