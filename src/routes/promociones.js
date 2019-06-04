const express = require('express');
const router = express.Router();

const Promocion = require('../models/Promocion');
const { isAuthenticated } = require('../helpers/auth');

router.get('/promociones/add', isAuthenticated, (req, res) => {
        res.render('promociones/agregar_promocion');
    })
    //recibir los datos ingresados en consola
router.post('/promociones/agregar_promocion', isAuthenticated, async(req, res) => {
    const { codigoPromocion, descripcionPromocion, fechaInicioPromocion, fechaFinPromocion, descuentoPromocion } = req.body; //obtener los datos
    const errors = [];
    if (!codigoPromocion || !descripcionPromocion || !fechaInicioPromocion || !fechaFinPromocion || !descuentoPromocion) {
        errors.push({ text: "Inserte todos los datos solicitados" })
    }
    if (errors.length > 0) {
        res.render('promociones/mostrar_promocion', {
            errors,
            codigoPromocion,
            descripcionPromocion,
            fechaInicioPromocion,
            fechaFinPromocion,
            descuentoPromocion
        })
    } else {
        const newPromocion = new Promocion({ codigoPromocion, descripcionPromocion, fechaInicioPromocion, fechaFinPromocion, descuentoPromocion });
        newPromocion.user = req.user.id
        await newPromocion.save(); //Guarda los datos en la bd
        //req.flash('sms_aceptado', 'Librería agregada'); sms error 
        res.redirect('/promociones');
    }
});
router.get('/promociones', isAuthenticated, async(req, res) => { //Titulo de cada pagina
    const promociones = await Promocion.find({ user: req.user.id }); //async ejecutar consultas sin que la consulta anterios haya finalizado
    res.render('promociones/mostrar_promocion', { promociones }); //mostrar los datos en una vista
});

router.get('/promociones/editar/:id', isAuthenticated, async(req, res) => {
    const promocion = await Promocion.findById(req.params.id);
    res.render('promociones/editar_promocion', { promocion });
})

router.put('/promociones/editar_promocion/:id', isAuthenticated, async(req, res) => {
    const { codigoPromocion, descripcionPromocion, fechaInicioPromocion, fechaFinPromocion, descuentoPromocion } = req.body;
    await Promocion.findByIdAndUpdate(req.params.id, {
        codigoPromocion,
        descripcionPromocion,
        fechaInicioPromocion,
        fechaFinPromocion,
        descuentoPromocion
    });
    res.redirect('/promociones');
})

router.delete('/promociones/eliminar/:id', isAuthenticated, async(req, res) => {
    await Promocion.findByIdAndDelete(req.params.id);
    res.redirect('/promociones');

});

module.exports = router;