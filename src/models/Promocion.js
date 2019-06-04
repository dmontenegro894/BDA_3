const mongoose = require('mongoose');
const { Schema } = mongoose;

//Como lucen los datos de las promociones
const PromocionSchema = new Schema({
    codigoPromocion: { type: String, required: true },
    descripcionPromocion: { type: String, required: true },
    fechaInicioPromocion: { type: String, required: true },
    fechaFinPromocion: { type: String, required: true },
    descuentoPromocion: { type: String, required: true },
    user: { type: String }
});

module.exports = mongoose.model('Promocion', PromocionSchema);