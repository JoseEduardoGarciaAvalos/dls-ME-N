var Bicicleta = require("../../models/bicicleta");

exports.bicicleta_list = function (req, res) {
    Bicicleta.find({}, function (err, bicicletas) {
        res.status(200).json({
            bicicletas: bicicletas
        });
    });
}

exports.bicicleta_create = function (req, res) {
    var bici = new Bicicleta({ code: req.body.id, color: req.body.color, modelo: req.body.modelo });
    bici.ubicacion = [req.body.lat, req.body.lng];
    Bicicleta.add(bici, function (err, newBici) {
        res.status(200).json({
            bicicleta: newBici
        });
    });
}

exports.bicicleta_update = async function (req, res) {
    var code = req.params.code;
    const bici = await Bicicleta.findByCode(code); //Buscar por codigo, para encontrar _id
    if(bici){
        bici.code = req.body.code;
        bici.color = req.body.color;
        bici.modelo = req.body.modelo;
        bici.ubicacion = [req.body.lat,req.body.lng];
        Bicicleta.updateByCode(code, bici, (err, filasRes) => {
            console.log("(API.bicicleta_update) Se modifico ", filasRes)
            res.status(200).json({
                bicicleta: bici
            });
        });
    }
}

exports.bicicleta_delete = function (req, res) {
    Bicicleta.removeByCode(req.body.code, function (err, dBici) {
        res.status(204).send();
    });
}

// exports.bicicleta_list = function (req, res){
//     res.status(200).json({
//         bicicletas: Bicicleta.allBicis
//     })
// }

// exports.bicicleta_create = function (req, res){
//     var bici = new Bicicleta(req.body.id,req.body.color,req.body.modelo)
//     bici.ubicacion = [req.body.lat,req.body.lng]

//     Bicicleta.add(bici)

//     res.status(200).json({
//         bicicletas: bici
//     })
// }

// exports.bicicleta_update = function (req, res){
//     var bici = Bicicleta.findById(req.body.id)
//     bici.color = req.body.color;
//     bici.modelo = req.body.modelo;
//     bici.ubicacion = [req.body.lat,req.body.lng];

//     res.status(200).json({
//         bicicletas: bici
//     })
// }

// exports.bicicleta_delete = function (req, res){
//     Bicicleta.removeById(req.body.id)
//     res.status(204).send()
// }
