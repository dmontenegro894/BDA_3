const express = require('express');
const router = express.Router();

const Cliente = require('../models/Cliente');
const { isAuthenticated } = require('../helpers/auth');


router.get('/clientes_admi/add', (req, res) => {
    res.render('clientes_admi/agregar_cliente');
});


//guarda en la BD al usuario 
router.post('/clientes_admi/agregar_cliente', async(req, res) => {
    const { cedulaUser, nombreUser, fecNacUser, tipoUser, lugarUser, email, telefonoUser, usuarioUser } = req.body;
    const errors = [];

    if (!cedulaUser || !nombreUser || !fecNacUser || !tipoUser || !lugarUser || !email || !telefonoUser || !usuarioUser) {
        errors.push({ text: "Inserte todos los datos solicitados" })
    }
    if (errors.length > 0) {
        res.render('clientes/mostrar_cliente_admi', {
            errors,
            cedulaUser,
            nombreUser,
            fecNacUser,
            tipoUser,
            lugarUser,
            email,
            telefonoUser,
            usuarioUser,
        })
    } else {
        const newCliente = new Cliente({ cedulaUser, nombreUser, fecNacUser, tipoUser, lugarUser, email, telefonoUser, usuarioUser });
        await newCliente.save(); //guarda en la bd
        res.redirect('/clientes_admi');

    }
});

//hacer ruta
router.get('/clientes_admi', async(req, res) => { //Titulo de cada pagina
    var clientes = await Cliente.find(); //async ejecutar consultas sin que la consulta anterios haya finalizado
    res.render('clientes/mostrar_cliente_admi', { clientes }); //mostrar los datos en una vista
});


module.exports = router;