const express = require('express');
const router = express.Router();

const Cliente = require('../models/Cliente');
const { isAuthenticated } = require('../helpers/auth');


router.get('/clientes/add', isAuthenticated, (req, res) => {
    res.render('clientes/agregar_cliente');
});


//guarda en la BD al usuario 
router.post('/clientes/agregar_cliente', isAuthenticated, async(req, res) => {
    const { cedulaUser, nombreUser, fecNacUser, tipoUser, lugarUser, email, telefonoUser, usuarioUser } = req.body;
    const errors = [];

    if (!cedulaUser || !nombreUser || !fecNacUser || !tipoUser || !lugarUser || !email || !telefonoUser || !usuarioUser) {
        errors.push({ text: "Inserte todos los datos solicitados" })
    }
    if (errors.length > 0) {
        res.render('clientes/mostrar_cliente', {
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
        newCliente.user = req.user.id;
        await newCliente.save(); //guarda en la bd
        res.redirect('/clientes');

    }
});

//hacer ruta
router.get('/clientes', isAuthenticated, async(req, res) => { //Titulo de cada pagina
    var clientes = await Cliente.find({ user: req.user.id }); //async ejecutar consultas sin que la consulta anterios haya finalizado
    res.render('clientes/mostrar_cliente', { clientes }); //mostrar los datos en una vista
});


//hacer ruta
router.get('/clientes/editar/:id', isAuthenticated, async(req, res) => {
    var cliente = await Cliente.findById(req.params.id);
    res.render('clientes/editar_cliente', { cliente });
})

//hacer ruta

router.put('/clientes/editar_cliente/:id', isAuthenticated, async(req, res) => {
    var { cedulaUser, nombreUser, fecNacUser, tipoUser, lugarUser, email, telefonoUser, usuarioUser } = req.body;
    await Cliente.findByIdAndUpdate(req.params.id, {
        cedulaUser,
        nombreUser,
        fecNacUser,
        tipoUser,
        lugarUser,
        email,
        telefonoUser,
        usuarioUser
    });
    res.redirect('/clientes');
})


module.exports = router;