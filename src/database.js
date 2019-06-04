const mongoose = require('mongoose');

//Conexion a mongodb, si la db no existe la crea
mongoose.connect('mongodb+srv://vane21:12345@bda-wlyx3.mongodb.net/test?retryWrites=true', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})

//sms para corroborar conexion
.then(db => console.log('Conexion exitosa'))
    .catch(err => console.error(err));