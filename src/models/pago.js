const e = require("express");
const mongoose=require("mongoose");
const pagoSchema=mongoose.Schema(
    {
        transaccion:{
            cantidad: {
                type: Number,
                required: true
            },
            moneda: {
                type: String,
                required: true,
                default: "COP"
            },
            id_orden:{
                type: String,
                required: true
            },
            estado:{
                type: String,
                required: true,
                enum: ["aprobado","rechazado","pendiente"],
                default: "pendiente"
            }
        },
        metodo_pago:{
            metodo:{
                type: String,
                required: true,
                enum: ["tarjeta","pse","punto_pago","tarjeta"]
            },
            tarjeta:{
                numero:{
                    type: String,
                    required: function(){
                        return this.metodo_pago.metodo==="tarjeta";
                    }
                },
                mes_vencimiento:{
                    type: String,
                    required: function(){
                        return this.metodo_pago.metodo==="tarjeta";
                    }
                },
                anno_vencimiento:{
                    type: String,
                    required: function(){
                        return this.metodo_pago.metodo==="tarjeta";
                    }
                },
                cvv:{
                    type: String,
                    required: function(){
                        return this.metodo_pago.metodo==="tarjeta";
                    }
                },
                nombre_titular:{
                    type: String,
                    required: function(){
                        return this.metodo_pago.metodo==="tarjeta";
                    }
                },
            },
            pse:{
                banco:{
                    type: String,
                    required: function(){
                        return this.metodo_pago.metodo==="pse";
                    }
                },
                correo:{
                    type: String,
                    required: function(){
                        return this.metodo_pago.metodo==="pse";
                    }
                },
            },
            punto_pago:{
                establecimiento:{
                    type: String,
                    required: function(){
                        return this.metodo_pago.metodo==="punto_pago";
                    }
                },
                ciudad:{
                    type: String,
                    required: function(){
                        return this.metodo_pago.metodo==="punto_pago";
                    }
                },
            },
            cliente:{
                nombre:{
                    type: String,
                    required: true
                },
                apellido:{
                    type: String,
                    required: true
                },
                correo:{
                    type: String,
                    required: true
                },
                telefono:{
                    type: String,
                    required: true
                },
                direccion:{
                    ciudad:{
                        type: String,
                        required: true
                    },
                    barrio:{
                        type: String,
                        required: true
                    },
                    direccion:{
                        type: String,
                        required: true
                    },
                    codigo_postal:{
                        type: String,
                        required: true
                    }
                }
            }
        }
    },
    {
        timestamps: true
    }
);
module.exports=mongoose.model('Pago',pagoSchema);