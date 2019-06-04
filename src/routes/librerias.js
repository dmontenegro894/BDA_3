const express = require('express');
const router = express.Router();

const Libreria = require('../models/Libreria');
const { isAuthenticated } = require('../helpers/auth');

//se coloca isAuthenticated para cada ruta qie se quiere asegurar

router.get('/librerias/add', isAuthenticated, (req, res) => {
    res.render('librerias/agregar_libreria');
})

//recibir los datos ingresados en consola
router.post('/librerias/agregar_libreria', isAuthenticated, async(req, res) => {
    const { codigoLibreria, nombreLibreria, paisLibreria, ubicacionLibreria, telefonoLibreria, horarioLibreria } = req.body; //obtener los datos
    const errors = [];
    if (!codigoLibreria || !nombreLibreria || !paisLibreria || !ubicacionLibreria || !telefonoLibreria || !horarioLibreria) {
        errors.push({ text: "Inserte todos los datos solicitados" })
    }
    if (errors.length > 0) {
        res.render('librerias/mostrar_libreria', {
            errors,
            codigoLibreria,
            nombreLibreria,
            paisLibreria,
            ubicacionLibreria,
            telefonoLibreria,
            horarioLibreria
        })
    } else {
        const newLibreria = new Libreria({ codigoLibreria, nombreLibreria, paisLibreria, ubicacionLibreria, telefonoLibreria, horarioLibreria });
        newLibreria.user = req.user.id; //codigo para asociar id user con id librerias (nota)
        await newLibreria.save(); //Guarda los datos en la bd
        res.redirect('/librerias');
    }
});
router.get('/librerias', isAuthenticated, async(req, res) => { //Titulo de cada pagina
    const librerias = await Libreria.find({ user: req.user.id }); //async ejecutar consultas sin que la consulta anterios haya finalizado
    res.render('librerias/mostrar_libreria', { librerias }); //mostrar los datos en una vista
});

router.get('/librerias/editar/:id', isAuthenticated, async(req, res) => {
    const libreria = await Libreria.findById(req.params.id);
    res.render('librerias/editar_libreria', { libreria });
})

router.put('/librerias/editar_libreria/:id', isAuthenticated, async(req, res) => {
    const { codigoLibreria, nombreLibreria, paisLibreria, ubicacionLibreria, telefonoLibreria, horarioLibreria } = req.body;
    await Libreria.findByIdAndUpdate(req.params.id, {
        codigoLibreria,
        nombreLibreria,
        paisLibreria,
        ubicacionLibreria,
        telefonoLibreria,
        horarioLibreria
    });
    res.redirect('/librerias');
})

router.delete('/librerias/eliminar/:id', isAuthenticated, async(req, res) => {
    await Libreria.findByIdAndDelete(req.params.id);
    res.redirect('/librerias');

});

module.exports = router;