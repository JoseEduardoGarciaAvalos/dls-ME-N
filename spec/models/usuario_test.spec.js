var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var Usuario = require('../../models/usuario');
var Reserva = require('../../models/reserva');

describe('Testing Usuarios', () => {
  beforeAll((done) => {
    var mongoDb = 'mongodb://localhost/testdb';
    mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Error conectado con Base de datos testDB'));
    db.once('open', () => {
      console.log('Conexion exitosa a testDB');
      done();
    });
  });

  afterEach((done) => {
    Reserva.deleteMany({}, (err, success) => {
      if (err) console.log(err);
      Usuario.deleteMany({}, (err, success) => {
        if (err) console.log(err);
        Bicicleta.deleteMany({}, (err, success) => {
          if (err) console.log(err);
          done();
        });
      });
    });
  });

  afterAll((done) => {
    Reserva.deleteMany({}, (err, success) => {
      if (err) console.log(err);
      Usuario.deleteMany({}, (err, success) => {
        if (err) console.log(err);
        Bicicleta.deleteMany({}, (err, success) => {
          if (err) console.log(err);
          mongoose.disconnect(err);
          done();
        });
      });
    });
  });

  describe('Un Usuario reserva una Bici', () => {
    it('Debe existir la reserva', (done) => {
      const usuario = new Usuario({ nombre: 'Eduardo' });
      usuario.save();
      const bicicleta = new Bicicleta({ code: 1, color: 'verde', modelo: 'urbana' });
      bicicleta.save();

      var hoy = new Date();
      var mañana = new Date();
      mañana.setDate(hoy.getDate() + 1);
      usuario.reservar(bicicleta.id, hoy, mañana, (err, reserva) => {
        Reserva.find({}).populate('bicicleta').populate('usuario').exec((err, reservas) => {
          console.log(reservas[0]);
          expect(reservas.length).toBe(1);
          expect(reservas[0].diasDeReserva()).toBe(2);
          expect(reservas[0].bicicleta.code).toBe(1);
          expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
          done();
        });
      });
    });
  });
});
