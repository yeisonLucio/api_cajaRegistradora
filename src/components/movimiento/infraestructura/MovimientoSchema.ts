import { Schema, model } from "mongoose"; 

const movimientoSchema = new Schema({

    fechaHora: {
        type: Date,
        default: new Date
    },
    tipoDinero: {
        type: String
    },
    tipoMovimiento: {
        type: String
    },
    dinero: {
        type: Object,
    }
})

 module.exports = model("Movimiento", movimientoSchema);

