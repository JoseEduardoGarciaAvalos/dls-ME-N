var Bicicleta = require('../../models/bicicleta');
var server = require('../../bin/www');
var request = require('request');
// const { base } = require('../../models/bicicleta');

describe('Bicicleta API', () => {
    describe('GET BICICLETAS /', () => {
        it('Status 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0);

            var a = new Bicicleta(1, "rojo", "urbana", [-34.6012424, -58.3861497])
            Bicicleta.add(a);

            request.get("http://localhost:3000/api/bicicletas", (error, response, body) => {
                // var result = JSON.parse(body);
                expect(response.statusCode).toBe(200);
                // expect(result.bicicletas.length).toBe(0);
                // done();
            });
        });
    });
    describe('POST BICICLETA /create', () => {
        it('STATUS 200', (done) => {
            var headers = { 'content-type': 'application/json' };
            var aBici = '{ "id": 10, "color": "rojo", "modelo": "urbana", "lat": -34, "lng": -54 }';
            request.post({
                headers: headers,
                url: "http://localhost:3000/api/bicicletas/create",
                body: aBici
            }, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                var bici =  Bicicleta.findById(10);
                console.log(bici);
                expect(bici.color).toBe('rojo');
                expect(bici.ubicacion[0]).toBe(-34);
                expect(bici.ubicacion[1]).toBe(-54);
                done();
            });
        });
    });
});