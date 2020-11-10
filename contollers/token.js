var Usuario = require('../models/usuario');
var Token = require('../models/token');

module.exports = {
  confirmationGet: function (req, res, next) {
    Token.findOne({ token: req.params.token }, function (err, token) {
      if (!token) return res.status(400).send({ type: 'not-verified', msg: 'No se encontro el usuario con este token, quiza haya expirado. Vuelva a Intentar' });
      Usuario.findById(token._userID, function (err, usuario) {
        if (!usuario) return res.status(400).send({ msg: 'No se encontro el usuario ' });
        if (usuario.verificado) return res.redirect('/usuarios');
        usuario.verificado = true;
        usuario.save(function (err) {
          if (err) { return res.status(500).send({ msg: err.message }); }
          res.redirect('/');
        });
      });
    });
  }
}
