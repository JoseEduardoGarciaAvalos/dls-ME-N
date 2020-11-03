//var server = require('../../bin/www');
var request = require('request');

var base_url = 'http://localhost:3000/api/bicicletas';

describe('Bicicleta API', () => {

    describe('GET BICICLETAS /', () => {
        it('Status 200 - Coleccion vacia', (done) => {
            console.log(""); console.log("*** TEST 1. GET BICICLETAS / (BD vacio)");
            request.get(base_url, (error, response, body) => {
                var result = JSON.parse(body);
                expect(response.statusCode).toBe(200);
                expect(result.bicicletas.length).toBe(0);
                done();
            });
        });
    });

    describe('POST BICICLETA /create', () => {
        it('STATUS 200', (done) => {
            console.log(""); console.log("*** TEST 2. POST BICICLETA /create");
            var headers = { 'content-type': 'application/json' };
            // Según el modelo el primer atributo es code, sin embargo a la hora de mandar el json, debe mandarse la clave id  que sustituirá a code
            var aBici = '{ "id": 100, "color": "rojo", "modelo": "urbana", "lat": -34, "lng": -54 }';
            //var aBici = '{ "code": 10, "color": "rojo", "modelo": "urbana", "lat": -34, "lng": -54 }'; //Si manda code, lo ignora moongose
            request.post({
                headers: headers,
                url: base_url + '/create',
                body: aBici
            }, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                var bici = JSON.parse(body).bicicleta;
                expect(bici.code).toBe(100);
                expect(bici.color).toBe('rojo');
                expect(bici.modelo).toBe('urbana');
                expect(bici.ubicacion[0]).toBe(-34);
                expect(bici.ubicacion[1]).toBe(-54);
                done();
            });
        });
    });
    
    describe('POST BICICLETA /update', () => {
        it('STATUS 202', (done) => {
            console.log(""); console.log("*** TEST 3. POST BICICLETA /update");
            var headers = { 'content-type': 'application/json' };
            var aBici = '{ "code": 10, "color": "verde", "modelo": "rural", "lat": -80, "lng": -10 }'; 
            request.put({
                headers: headers,
                url: base_url + '/100/update',
                body: aBici
            }, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                var bici = JSON.parse(body).bicicleta;
                expect(bici.code).toBe(10);
                expect(bici.color).toBe('verde');
                expect(bici.modelo).toBe('rural');
                expect(bici.ubicacion[0]).toBe(-80);
                expect(bici.ubicacion[1]).toBe(-10);
                done();
            });
        });
    });

    describe('GET BICICLETAS /', () => {
        it('Status 200 - Coleccion 1', (done) => {
            console.log(""); console.log("*** TEST 1. GET BICICLETAS / (Hay 1 elemento)");
            request.get(base_url, (error, response, body) => {
                var result = JSON.parse(body);
                expect(response.statusCode).toBe(200);
                expect(result.bicicletas.length).toBe(1);
                done();
            });
        });
    });

    describe('DELETE BICICLETAS /delete', () => {
        it('Status 200', (done) => {
            console.log(""); console.log("*** TEST 4. DELETE BICICLETAS /delete");
            var headers = { 'content-type': 'application/json' };
            var body = '{ "code": 10}';
            
            request.delete({
                headers: headers,
                url: base_url + '/delete',
                body: body
            }, (error, response, body) => {
                expect(response.statusCode).toBe(204);
                done();
            });
        });
    });

    describe('GET BICICLETAS /', () => {
        it('Status 200 - Coleccion vacia', (done) => {
            console.log(""); console.log("*** TEST 1. GET BICICLETAS / (BD Vacio)");
            request.get(base_url, (error, response, body) => {
                var result = JSON.parse(body);
                expect(response.statusCode).toBe(200);
                expect(result.bicicletas.length).toBe(0);
                done();
            });
        });
    });

});

// describe('Bicicleta API', () => {
//     describe('GET BICICLETAS /', () => {
//         it('Status 200', () => {
//             expect(Bicicleta.allBicis.length).toBe(0);

//             var a = new Bicicleta(1, "rojo", "urbana", [-34.6012424, -58.3861497])
//             Bicicleta.add(a);

//             request.get("http://localhost:3000/api/bicicletas", (error, response, body) => {
//                 expect(response.statusCode).toBe(200);
//             });
//         });
//     });
//     describe('POST BICICLETA /create', () => {
//         it('STATUS 200', (done) => {
//             var headers = { 'content-type': 'application/json' };
//             var aBici = '{ "id": 10, "color": "rojo", "modelo": "urbana", "lat": -34, "lng": -54 }';
//             request.post({
//                 headers: headers,
//                 url: "http://localhost:3000/api/bicicletas/create",
//                 body: aBici
//             }, (error, response, body) => {
//                 expect(response.statusCode).toBe(200);
//                 var bici =  Bicicleta.findById(10);
//                 console.log(bici);
//                 expect(bici.color).toBe('rojo');
//                 expect(bici.ubicacion[0]).toBe(-34);
//                 expect(bici.ubicacion[1]).toBe(-54);
//                 done();
//             });
//         });
//     });
// });