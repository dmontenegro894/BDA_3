var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var Libreria = mongoose.model('Libreria');

//Como lucen los datos de las libros
var LibroSchema = new Schema({
    codigoLibro: String,
    Libreria: String,
    //Libreria: { type: mongoose.Schema.Types.ObjectId, ref: "Libreria" },
    nombreLibro: String,
    temaLibro: String,
    descripcionLibro: String,
    cantidadVendidaLibro: String,
    cantidadDisponibleLibro: String,
    precioLibro: Number,
    user: { type: String }
    //Libreria: String,
});

module.exports = mongoose.model('Libro', LibroSchema);