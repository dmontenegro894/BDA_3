const express = require('express');
const router = express.Router();
const Libro = require('../models/Libro');
const Carrito = require('../models/carrito');
const { isAuthenticated } = require('../helpers/auth');

router.get('/carritos_agente/:id', isAuthenticated, function(req, res, next) {
    const libroID = req.params.id;
    const carrito = new Carrito(req.session.carrito ? req.session.carrito : {});
    Libro.findById(libroID, function(err, Libro) {
        if (err) {
            return res.redirect('/');
        }
        carrito.add(Libro, libroID);
        req.session.carrito = carrito;
        console.log(req.session.carrito);
        res.redirect('/');
    });

});



router.get('/carrito_agente', isAuthenticated, function(req, res, next) {
    if (!req.session.carrito) { //si no hay nada en carrito de compras
        return res.render('carritos/carritos_agente', { Libros: null });
    }
    var carrito = new Carrito(req.session.carrito);
    res.render('carritos/carritos_agente', {
        Libros: carrito.generateArray(),
        totalPrecioLibro: carrito.totalPrecioLibro
    })

});

module.exports = router;