const express = require('express');
const router = express.Router();

const Promocion = require('../models/Promocion');
const { isAuthenticated } = require('../helpers/auth');

router.get('/promociones_cliente/add', (req, res) => {
        res.render('promociones/agregar_promocion');
    })
    //recibir los datos ingresados en consola
router.post('/promociones_cliente/agregar_promocion', async(req, res) => {
    const { codigoPromocion, descripcionPromocion, fechaInicioPromocion, fechaFinPromocion, descuentoPromocion } = req.body; //obtener los datos
    const errors = [];
    if (!codigoPromocion || !descripcionPromocion || !fechaInicioPromocion || !fechaFinPromocion || !descuentoPromocion) {
        errors.push({ text: "Inserte todos los datos solicitados" })
    }
    if (errors.length > 0) {
        res.render('promociones/mostrar_promocion_cliente', {
            errors,
            codigoPromocion,
            descripcionPromocion,
            fechaInicioPromocion,
            fechaFinPromocion,
            descuentoPromocion
        })
    } else {
        const newPromocion = new Promocion({ codigoPromocion, descripcionPromocion, fechaInicioPromocion, fechaFinPromocion, descuentoPromocion });
        // newPromocion.user = req.user.id
        await newPromocion.save(); //Guarda los datos en la bd
        //req.flash('sms_aceptado', 'Librería agregada'); sms error 
        res.redirect('/promociones_cliente');
    }
});
router.get('/promociones_cliente', async(req, res) => { //Titulo de cada pagina
    const promociones = await Promocion.find(); //{ user: req.user.id }); //async ejecutar consultas sin que la consulta anterios haya finalizado
    res.render('promociones/mostrar_promocion_cliente', { promociones }); //mostrar los datos en una vista
});


module.exports = router;