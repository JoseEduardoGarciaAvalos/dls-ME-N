var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Reserva = require('./reserva');
var Schema = mongoose.Schema;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Token = require('../models/token');
const mailer = require('../mailer/mailer');

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

var usuarioSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
    required: [true, 'El nombre es obligatorio']
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'El email es obligatorio'],
    lowercase: true,
    unique: true,
    validate: [validateEmail, 'Por favor ingrese un email válido'],
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/]
  },
  password: {
    type: String,
    required: [true, 'El password es obligatorio']
  },
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
  verificado: {
    type: Boolean,
    default: false
  },
  googleId: String,
  facebookId: String
});

usuarioSchema.plugin(uniqueValidator, { message: 'el {PATH} ya existe con otro usuario.' });

usuarioSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
  }
  next();
});

usuarioSchema.methods.validPassword = function (password) { 
  return bcrypt.compareSync(password, this.password);
}

usuarioSchema.methods.reservar = function (biciId, desde, hasta, cb) {
  var reserva = new Reserva({ usuario: this._id, bicicleta: biciId, desde: desde, hasta: hasta });
  console.log(reserva);
  reserva.save(cb);
}

usuarioSchema.methods.enviar_email_bienvenida = function (cb) {
  const token = new Token({ _userID: this.id, token: crypto.randomBytes(16).toString('hex') });
  const email_destination = this.email;
  token.save(function (err) {
    if (err) { return console.log(err.message); }

    const mailOptions = {
      from: 'no-reply@redbicicletas.com',
      to: email_destination,
      subject: 'Verificación de cuenta',
      text: 'Hola,\n\n' + 'Por favor para verificar su cuenta haga click en el siguiente link: \n' + 'http://localhost:3000' + '\/token/confirmation\/' + token.token + '\n'
    };
    mailer.sendMail(mailOptions, function (err) {
      if (err) { return console.log(err.message); }
      console.log('Se ha enviado un emial de bienvenida a:' + email_destination);
    });
  });
}

usuarioSchema.methods.resetPassword = function (cb) {
  const token = new Token({ _userID: this.id, token: crypto.randomBytes(16).toString('hex') });
  const email_destination = this.email;
  token.save(function (err) {
    if (err) { return cb(err); }

    const mailOptions = {
      from: 'no-reply@redbicicletas.com',
      to: email_destination,
      subject: 'Reseteo de la constraseña de su cuenta',
      text: 'Hola,\n\n' + 'Por favor click en el siguiente link para resetear la contraseña de su cuenta:\n' + 'http://localhost:3000' + '\/resetPassword\/' + token.token + '\n'
    };

    mailer.sendMail(mailOptions, function (err) {
      if (err) { return cb(err); }
      console.log('Se envió un email para resetear la contraseña a ' + email_destination + '.');
    });

    cb(null);
  });
}

usuarioSchema.statics.findOneOrCreateByGoogle = function findOneOrCreateByGoogle(condition, callback) {
  const self = this;
  console.log(condition);
  self.findOne({
    $or: [
      { 'googleId': condition.id }, { 'email': condition.emails[0].value }
    ]
  }, (err, result) => {
    if (result) {
      callback(err, result)
    } else {
      console.log('------------- CONDITION ----------');
      console.log(condition);
      let values = {};
      values.googleId = condition.id;
      values.email = condition.emails[0].value;
      values.nombre = condition.displayName || 'SIN NOMBRE';
      values.verificado = true;
      values.password = condition._json.sub;
      console.log('------------- VALUES ----------');
      console.log(values);
      self.create(values, (err, result) => {
        if (err) { console.log(err); }
        return callback(err, result);
      })
    }
  })
};

usuarioSchema.statics.findOneOrCreateByFacebook = function findOneOrCreateByFacebook(condition, callback) {
  const self = this;
  console.log(condition);
  self.findOne({
    $or: [
      { 'facebookId': condition.id }, { 'email': condition.emails[0].value }
    ]
  }, (err, result) => {
    if (result) {
      callback(err, result)
    } else {
      console.log('------------- CONDITION ----------');
      console.log(condition);
      let values = {};
      values.facebookId = condition.id;
      values.email = condition.emails[0].value;
      values.nombre = condition.displayName || 'SIN NOMBRE';
      values.verificado = true;
      values.password = crypto.randomBytes(16).toString('hex');
      console.log('------------- VALUES ----------');
      console.log(values);
      self.create(values, (err, result) => {
        if (err) { console.log(err); }
        return callback(err, result);
      })
    }
  })
};

module.exports = mongoose.model('Usuario', usuarioSchema);
