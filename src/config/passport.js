const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/User');

passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField: 'password'
}, async(email,password,done)=>{
    const user=await User.findOne({email: email});
    if(!user){ //si no existe un usuario
        return done(null,false,{message:'El usuario no existe'});
    }else{ //encuentra el usuario, ver si contraseña es correcta
        const match= await user.matchPassword(password);
        if(match){
            return done(null, user); 
        }else{//ninguno es correcto
            return done (null, false,{message: 'Contraseña incorrecta'});
        }
    }
}));

passport.serializeUser((user,done)=>{
    done(null, user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id,(err, user)=>{
        done(err,user);
    });
});