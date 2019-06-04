var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Como lucen los datos de las librerias
const LibreriaSchema = new Schema({
    codigoLibreria: { type: String, required: true },
    nombreLibreria: { type: String, required: true },
    paisLibreria: { type: String, required: true },
    ubicacionLibreria: { type: String, required: true },
    telefonoLibreria: { type: String, required: true },
    horarioLibreria: { type: String, required: true },
    user: String,
});

module.exports = mongoose.model('Libreria', LibreriaSchema);