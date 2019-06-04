const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

//Inicializar
const app = express();

//Base de datos
require('./database');
require('./config/passport');

//Configuracion
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method')); //enviar eliminar
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Variables globales
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null; //autenticar rutas
    next();
});

app.use(express.static(path.join(__dirname, 'public')));


//Rutas
app.use(require('./routes/index'));
app.use(require('./routes/librerias'));
app.use(require('./routes/librerias_cliente'));
app.use(require('./routes/libros'));
app.use(require('./routes/libros_cliente'));
app.use(require('./routes/promociones'));
app.use(require('./routes/promociones_cliente'));
app.use(require('./routes/users'));
app.use(require('./routes/clientes'));
app.use(require('./routes/clientes_admi'));
app.use(require('./routes/carritos'));
app.use(require('./routes/carritos_admi'));
app.use(require('./routes/carritos_agente'));
app.use(require('./routes/carritos_agente_reporte'));
app.use(require('./routes/carritos_admi_reporte'));




//Servidor
app.listen(app.get('port'), () => {
    console.log('Servidor funcionando', app.get('port'));
});


//ENVIO DE CORREOS 

//Requerimos el paquete

//ENVIO DE CORREOS 

//Requerimos el paquete
var nodemailer = require('nodemailer');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//Creamos el objeto de transporte
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'librarytec.bda@gmail.com',
        pass: 'bdaprogra2'
    }
});

var mensaje = "Su pedido ha sido procesado, por la compra de 2 libros de Cien años de soledad, por un monto de 120000. La fecha de entrega es el 16 de mayo en el campus central del TEC. ¡Gracias por preferirnos!";

var mailOptions = {
    from: 'librarytec.bda@gmail.com',
    to: 'vanebp2@gmail.com',
    subject: 'LibraryTEC',
    text: mensaje
};


app.post('/librerias', function(req, res) {
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    })
});