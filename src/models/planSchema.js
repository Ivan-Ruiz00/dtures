const e = require("express");
const mongoose = require("mongoose");

const planSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    categoria: {
      type: String,
      required: true,
      enum: ["aventura", "cultural", "extremo", "vacaciones", "gastronomico"],
    },

    subcategoria: {
      type: [String],
      default: [],
    },

    destino: {
      pais: {
        type: String,
        required: true,
      },
      region: {
        type: String,
        required: true,
      },
      ciudad: {
        type: [String],
        default: [],
      }
    },

    duracion: {
      dias_totales: {
        type: Number,
        required: true,
      },
      noches_totales: {
        type: Number,
        required: true,
      },
      fecha_inicio: {
        type: Date,
        required: true,
      },
      fecha_fin: {
        type: Date,
        required: true,
      },
      temporada: {
        type: String,
        required: true,
        enum: ["alta", "media", "baja"],
      },
    },

    precio: {
      precio_por_persona: {
        type: Number,
        required: true,
      },
      moneda: {
        type: String,
        default: "COP",
      }
    },

    estado: {
      type: String,
      default: "inactivo",
      enum: ["activo", "inactivo", "agotado", "proximamente"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Plan", planSchema);
