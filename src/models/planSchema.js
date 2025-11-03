const e = require("express");
const mongoose = require("mongoose");
const planSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        descripcion: {
            type: String,
            required: true
        },
        categoria: {
            type: String,
            required: true,
            enum: ["aventura", "cultural", "extremo", "vacaciones", "gastronomico"]
        },
        subcategoria: [
            {
                type: String
            }
        ],
        destino: {
            pais: {
                type: String,
                required: true
            },
            region: {
                type: String,
                required: true
            },
            ciudad: [
                {
                    type: String,
                    required: true
                }
            ],
            clima: {
                type: String,
                required: true
            },
            requisitos_salud: [
                {
                    type: String
                }
            ]
        },
        duracion: {
            dias_totales: {
                type: Number,
                required: true
            },
            noches_totales: {
                type: Number,
                required: true
            },
            fecha_inicio: {
                type: Date,
                required: true
            },
            fecha_fin: {
                type: Date,
                required: true
            },
            temporada: {
                type: String,
                required: true,
                enum: ["alta", "media", "baja"]
            }
        },
        itinerario: [
            {
                dia: {
                    type: Number,
                    required: true
                },
                titulo: {
                    type: String,
                    required: true
                },
                actividad: [
                    {
                        hora_inicio: {
                            type: String,
                            required: true
                        },
                        hora_fin: {
                            type: String,
                            required: true
                        },
                        actividad: {
                            type: String,
                            required: true
                        },
                        tipo: {
                            type: String,
                            required: true,
                            enum: ["transporte", "alimentacion", "aventura", "actividad", "relajacion"]
                        },
                        descripcion: {
                            type: String
                        },
                        lugar: {
                            type: String,
                            required: true
                        },
                        incluido: [
                            {
                                type: String
                            }
                        ]
                    }
                ],
                alojamiento: {
                    tipo: {
                        type: String,
                        required: true
                    },
                    nombre: {
                        type: String,
                        required: true
                    },
                    categoria: {
                        type: String,
                        required: true
                    },
                    comidas_incluidas: {
                        type: [String]
                    }
                }
            }
        ],
        servicios_incluidos: {
            transporte: {
                type: [String]
            },
            alojamiento: {
                type: [String]
            },
            alimentacion: {
                type: [String]
            },
            guiado: {
                type: [String]
            },
            entradas: {
                type: [String]
            },
            equipamiento: {
                type: [String]
            },
            seguro: {
                type: [String]
            }
        },
        precio: {
            precio_por_persona: {
                type: Number,
                required: true
            },
            moneda: {
                type: String,
                default: "COP"
            },
            desglose: {
                alojamiento: {
                    type: Number,
                    required: true
                },
                transporte: {
                    type: Number,
                    required: true
                },
                alimentacion: {
                    type: Number,
                },
                actividades: {
                    type: Number,
                    required: true
                },
                entradas: {
                    type: Number
                },
                guiado: {
                    type: Number
                },
                seguro:{
                    type: Number
                }
            },
            descuentos:[
                {
                    concepto:{
                        type: String
                    },
                    porcentaje:{
                        type: Number
                    }
                }
            ]
        },
        requisito:{
            edad_minima:{
                type: Number
            },
            edad_maxima:{
                type: Number
            },
            condicion_fisica:{
                type: String,
                enum: ["baja","media","alta"]
            },
            vacunas_obligatorias:{
                type: [String]
            },
            documentos_necesarios:{
                type: [String]
            },
            seguros_necesarios:{
                type: [String]
            }
        },
        logistica:{
            punto_encuentro:{
                type: String,
                required: true
            },
            hora_encuentro:{
                type: String,
                required: true
            },
            tamanno_grupo:{
                minimo:{
                    type: Number,
                    required: true
                },
                maximo:{
                    type: Number,
                    required: true
                }
            },
            idioma_guia:{
                type: [String],
                required: true
            },
            contacto_coordinador:{
                nombre:{
                    type: String,
                    required: true
                },
                telefono:{
                    type: String,
                    required: true
                },
                email:{
                    type: String,
                    required: true
                }
            }
        },
        politica:{
            cancelacion:[
                {
                    dias_anticipacion:{
                        type: Number,
                        required: true
                    },
                    penalizacion:{
                        type: String,
                        required: true
                    },
                }
            ],
            reprogramacion:[
                {
                    dias_anticipacion:{
                        type: Number,
                        required: true
                    },
                    penalizacion:{
                        type: String,
                        required: true
                    },
                }
            ],
            clima:[
                {
                    descripcion:{
                        type: String,
                        required: true
                    }
                }
            ],
            responsabilidad:[
                {
                    descripcion:{
                        type: String,
                        required: true
                    }
                }
            ]
        },
        estado:{
            type: String,
            default: "inactivo",
            enum: ["activo", "inactivo", "agotado", "proximamente"]
        }
    },
    {
        timestamps: true
    }
);