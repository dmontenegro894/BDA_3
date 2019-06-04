const express = require('express');
const router = express.Router();

const User = require('../models/User');
const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/signin',
    failureFlash: true
}));


router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', async(req, res) => {
    const { nombreUser, email, usuarioUser, password, confirmar_contraseña } = req.body;
    const errors = [];

    if (password != confirmar_contraseña) {
        errors.push({ text: 'Las contraseñas no coinciden' });
    }
    if (errors.length > 0) {
        res.render('users/signup', { errors, nombreUser, email, usuarioUser, password, confirmar_contraseña })
    } else {
        const newUser = new User({ nombreUser, email, usuarioUser, password });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'Registro exitoso');
        res.redirect('/users/signin');

    }

});

router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

module.exports = router;