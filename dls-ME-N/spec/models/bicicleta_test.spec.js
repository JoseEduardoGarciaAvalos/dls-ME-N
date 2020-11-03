var Bicicleta = require('../../models/bicicleta');

beforeEach(() => {
    Bicicleta.allBicis = [];
});

describe('Bicicletas.allBicis', () => {
    it('Comienza vacia', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

describe('Bicicletas.add', () => {
    it('Agregar una bici', () => {
        var a = new Bicicleta(0,"rojo","urbana", [-34.6012424,-58.3861497])
        Bicicleta.add(a)
        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(a);
    });
});

describe('Bicicletas.findById', () => {
    it('Devolver la bici según id', () => {
        var a = new Bicicleta(1,"rojo","urbana", [-34.6012424,-58.3861497])
        var b = new Bicicleta(2,"blanca","urbana", [-34.596932,-58.3808287])
        Bicicleta.add(a);
        Bicicleta.add(b);
        expect(Bicicleta.allBicis.length).toBe(2);
        expect(Bicicleta.findById(1)).toEqual(a);
    });
});

describe('Bicicletas.removeById', () => {
    it('Eliminar una bici', () => {
        var a = new Bicicleta(1,"rojo","urbana", [-34.6012424,-58.3861497])
        var b = new Bicicleta(2,"blanca","urbana", [-34.596932,-58.3808287])
        Bicicleta.add(a);
        Bicicleta.add(b);
        expect(Bicicleta.allBicis.length).toBe(2);
        Bicicleta.removeById(1)
        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.findById(2)).toEqual(b);
    });
});