var express = require('express');
var router = express.Router();

var Libro = require('../models/Libro');
const { isAuthenticated } = require('../helpers/auth');

router.get('/libros/add', isAuthenticated, (req, res) => {
        res.render('libros/agregar_libro');
    })
    //recibir los datos ingresados en consola
router.post('/libros/agregar_libro', isAuthenticated, async(req, res) => {
    var { codigoLibro, Libreria, nombreLibro, temaLibro, 
        descripcionLibro, cantidadVendidaLibro, 
        cantidadDisponibleLibro, precioLibro } = req.body; //obtener los datos
    var errors = [];
    if (!codigoLibro || !Libreria || !nombreLibro || !temaLibro || !descripcionLibro || !cantidadVendidaLibro || !cantidadDisponibleLibro || !precioLibro) {
        errors.push({ text: "Inserte todos los datos solicitados" })
    }
    if (errors.length > 0) {
        res.render('libros/mostrar_libro', {
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
        newLibro.user = req.user.id
        await newLibro.save(); //Guarda los datos en la bd;
        res.redirect('/libros');
    }
});
router.get('/libros', isAuthenticated, async(req, res) => { //Titulo de cada pagina
    var libros = await Libro.find({ user: req.user.id }); //async ejecutar consultas sin que la consulta anterios haya finalizado
    res.render('libros/mostrar_libro', { libros }); //mostrar los datos en una vista
});

router.get('/libros/editar/:id', isAuthenticated, async(req, res) => {
    var libro = await Libro.findById(req.params.id);
    res.render('libros/editar_libro', { libro });
})

router.put('/libros/editar_libro/:id', isAuthenticated, async(req, res) => {
    var { codigoLibro, Libreria, nombreLibro, 
        temaLibro, descripcionLibro, cantidadVendidaLibro, 
        cantidadDisponibleLibro, precioLibro } = req.body;
    await Libro.findByIdAndUpdate(req.params.id, {
        codigoLibro,
        Libreria,
        nombreLibro,
        temaLibro,
        descripcionLibro,
        cantidadVendidaLibro,
        cantidadDisponibleLibro,
        precioLibro
    });
    res.redirect('/libros');
})

router.delete('/libros/eliminar/:id', isAuthenticated, async(req, res) => {
    await Libro.findByIdAndDelete(req.params.id);
    res.redirect('/libros');

});


//aqui inicia                 BUSQUEDAS
//libreria
router.get('/libros/lib', isAuthenticated, (req, res) => {
    res.render('libros/buscar_libro_lib');
})

router.post('/libros/buscar_libro_lib',function(req,res){
    Libro.find({Libreria:req.body.Libreria},function(err,docs){
        console.log(docs);
        res.send(docs);
    });
});

//libro
router.get('/libros/nom', isAuthenticated, (req, res) => {
    res.render('libros/buscar_libro_nom');
})

router.post('/libros/buscar_libro_nom',function(req,res){
    Libro.find({nombreLibro:req.body.nombreLibro},function(err,docs){
        console.log(docs);
        res.send(docs);
    });
});

//tema
router.get('/libros/tema', isAuthenticated, (req, res) => {
    res.render('libros/buscar_libro_tema');
})

router.post('/libros/buscar_libro_tema',function(req,res){
    Libro.find({temaLibro:req.body.temaLibro},function(err,docs){
        console.log(docs);
        res.send(docs);
    });
});

//precio
router.get('/libros/precio', isAuthenticated, (req, res) => {
    res.render('libros/buscar_libro_precio');
})

router.post('/libros/buscar_libro_precio',function(req,res){
    Libro.find({precioLibro:req.body.precioLibro},function(err,docs){
        console.log(docs);
        res.send(docs);
    });
});


//intento de busqueda avanzada
router.get('/libros/varios', isAuthenticated, (req, res) => {
    res.render('libros/buscar_varios');
})

router.post('/libros/buscar_varios',function(req,res){
    Libro.find({Libreria:req.body.Libreria,nombreLibro:req.body.nombreLibro,
        temaLibro:req.body.temaLibro,precioLibro:req.body.precioLibro},function(err,docs){
        console.log(docs);
        res.send(docs);
    });
});


//aqui termina                 BUSQUEDAS
module.exports = router;

