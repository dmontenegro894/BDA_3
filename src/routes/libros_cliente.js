var express = require('express');
var router = express.Router();
var event = require('events');


var Libro = require('../models/Libro');
const { isAuthenticated } = require('../helpers/auth');

router.get('/libros_cliente/add', (req, res) => {
        res.render('libros_cliente/agregar_libro');
    })
    //recibir los datos ingresados en consola
router.post('/libros_cliente/agregar_libro', async(req, res) => {
    var { codigoLibro, Libreria, nombreLibro, temaLibro, descripcionLibro, cantidadVendidaLibro, cantidadDisponibleLibro, precioLibro } = req.body; //obtener los datos
    var errors = [];
    if (!codigoLibro || !Libreria || !nombreLibro || !temaLibro || !descripcionLibro || !cantidadVendidaLibro || !cantidadDisponibleLibro || !precioLibro) {
        errors.push({ text: "Inserte todos los datos solicitados" })
    }
    if (errors.length > 0) {
        res.render('libros/mostrar_libro_cliente', {
            errors,
            codigoLibro,
            Libreria,
            nombreLibro,
            temaLibro,
            descripcionLibro,
            cantidadVendidaLibro,
            cantidadDisponibleLibro,
            precioLibro
        })
    } else {
        var newLibro = new Libro({ codigoLibro, Libreria, nombreLibro, temaLibro, descripcionLibro, cantidadVendidaLibro, cantidadDisponibleLibro, precioLibro });
        // newLibro.user = req.user.id
        await newLibro.save(); //Guarda los datos en la bd;
        res.redirect('/libros_cliente');
    }
});
router.get('/libros_cliente', async(req, res) => { //Titulo de cada pagina
    var libros = await Libro.find(); //{ user: req.user.id }); //async ejecutar consultas sin que la consulta anterios haya finalizado
    res.render('libros/mostrar_libro_cliente', { libros }); //mostrar los datos en una vista
});



module.exports = router;