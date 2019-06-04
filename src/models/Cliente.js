const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Como lucen los datos de las librerias
const ClienteSchema = new Schema({
    cedulaUser: { type: String, required: true },
    nombreUser: { type: String, required: true },
    fecNacUser: { type: String, required: true },
    tipoUser: { type: String, required: true },
    lugarUser: { type: String, required: true },
    email: { type: String, required: true },
    telefonoUser: { type: String, required: true },
    usuarioUser: { type: String, required: true },
    user: String,

});

module.exports = mongoose.model('Cliente', ClienteSchema);