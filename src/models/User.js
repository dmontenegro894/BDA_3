const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

//Como lucen los datos de las librerias
const UserSchema = new Schema({
    nombreUser: { type: String, required: true },
    email: { type: String, required: true },
    usuarioUser: { type: String, required: true },
    password: { type: String, required: true }
});

UserSchema.methods.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
}

UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);