const parser = require("body-parser");
const express = require("express");
const cors = require("cors"); // <-- importar CORS
const app = express();
const port = 3000;
const authRoutes = require("./routes/authentication");
const pagosRoutes = require("./routes/pago");
const planRoutes = require("./routes/plan");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(cors({
    origin: 'http://localhost:4200', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middlewares
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
app.use(express.json());

// Rutas
app.use("/api", pagosRoutes);
app.use("/api", authRoutes);
app.use("/api", planRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Conexión exitosa"))
    .catch((error) => console.log(error));

// Iniciar servidor
app.listen(port, () => {
    console.log(`App de ejemplo escuchando el puerto ${port}`);
});
