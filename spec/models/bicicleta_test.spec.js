var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');

describe('Testing Bicicletas', () => {
    beforeAll((done) => { mongoose.connection.close(done) });

    beforeEach((done) => {
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', () => {
            console.log('We are connected to test database!');
            done();
        });
    });

    afterEach((done) => {
        Bicicleta.deleteMany({}, function (err, success) {
            if (err) console.log(err);
            mongoose.disconnect();
            done();
        });
    });

    describe('Bicicleta.createInstance', () => {
        it('Crea una instancia de Bicicleta', () => {
            var bici = Bicicleta.createInstance(1, 'verde', 'urbana', [-34.5, -54.1]);

            expect(bici.code).toBe(1);
            expect(bici.color).toBe('verde');
            expect(bici.modelo).toBe('urbana');
            expect(bici.ubicacion[0]).toEqual(-34.5);
            expect(bici.ubicacion[1]).toEqual(-54.1);
        });
    });

    describe('Bicicleta.allBicis', () => {
        it('Comienza vacía', (done) => {
            Bicicleta.allBicis((err, bicis) => {
                expect(bicis.length).toBe(0);
                done();
            })
        });
    });

    describe('Bicicleta.add', () => {
        it('Agrega sola una bici', (done) => {
            var aBici = new Bicicleta({ code: 1, color: 'verde', modelo: 'urbana' });
            Bicicleta.add(aBici, (err, newBici) => {
                if (err) console.log(err);
                Bicicleta.allBicis((err, bicis) => {
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toEqual(aBici.code);
                    done();
                });
            });
        });
    });

    describe('Bicicleta.findByCode', () => {
        it('debe devolver la bici con code 1', (done) => {
            Bicicleta.allBicis((err, bicis) => {
                expect(bicis.length).toBe(0);

                var aBici = new Bicicleta({ code: 1, color: 'verde', modelo: 'urbana' });
                Bicicleta.add(aBici, (err, newBici) => {
                    if (err) console.log(err);
                    
                    var aBici2 = new Bicicleta({ code: 2, color: 'rojo', modelo: 'urbana' });
                    Bicicleta.add(aBici2, (err, newBici) => {
                        if (err) console.log(err);
                        Bicicleta.findByCode(1, (err, targetBici) => {
                            expect(targetBici.code).toBe(aBici.code);
                            expect(targetBici.color).toBe(aBici.color);
                            expect(targetBici.modelo).toBe(aBici.modelo);

                            done();
                        });
                    });
                });
            });
        });
    });

    describe('Bicicleta.removeByCode', () => {
        it('Elimina una bici', (done) => {
            var aBici = new Bicicleta({ code: 10, color: 'verde', modelo: 'urbana' });
            Bicicleta.add(aBici, (err, newBici) => {
                if (err) console.log(err);
                Bicicleta.allBicis((err, bicis) => {
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toEqual(aBici.code);
                    Bicicleta.removeByCode(10, (err, newBici) => {
                        if (err) console.log(err);
                        Bicicleta.allBicis((err, bicis) => {
                            expect(bicis.length).toEqual(0);
                            done();
                        });
                    });
                });
            });
        });
    });

});

// beforeEach(() => {
//     Bicicleta.allBicis = [];
// });

// describe('Bicicletas.allBicis', () => {
//     it('Comienza vacia', () => {
//         expect(Bicicleta.allBicis.length).toBe(0);
//     });
// });

// describe('Bicicletas.add', () => {
//     it('Agregar una bici', () => {
//         var a = new Bicicleta(0,"rojo","urbana", [-34.6012424,-58.3861497])
//         Bicicleta.add(a)
//         expect(Bicicleta.allBicis.length).toBe(1);
//         expect(Bicicleta.allBicis[0]).toBe(a);
//     });
// });

// describe('Bicicletas.findById', () => {
//     it('Devolver la bici según id', () => {
//         var a = new Bicicleta(1,"rojo","urbana", [-34.6012424,-58.3861497])
//         var b = new Bicicleta(2,"blanca","urbana", [-34.596932,-58.3808287])
//         Bicicleta.add(a);
//         Bicicleta.add(b);
//         expect(Bicicleta.allBicis.length).toBe(2);
//         expect(Bicicleta.findById(1)).toEqual(a);
//     });
// });

// describe('Bicicletas.removeById', () => {
//     it('Eliminar una bici', () => {
//         var a = new Bicicleta(1,"rojo","urbana", [-34.6012424,-58.3861497])
//         var b = new Bicicleta(2,"blanca","urbana", [-34.596932,-58.3808287])
//         Bicicleta.add(a);
//         Bicicleta.add(b);
//         expect(Bicicleta.allBicis.length).toBe(2);
//         Bicicleta.removeById(1)
//         expect(Bicicleta.allBicis.length).toBe(1);
//         expect(Bicicleta.findById(2)).toEqual(b);
//     });
// });