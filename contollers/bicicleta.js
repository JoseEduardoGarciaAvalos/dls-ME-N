var Bicicleta = require("../models/bicicleta");

exports.bicicleta_list = function (req, res){
    Bicicleta.allBicis((err, datos) => {
        res.render("bicicletas/index", {bicis: datos})
    })
    
}

exports.bicicleta_create_get = function (req, res){
    res.render("bicicletas/create")
}


exports.bicicleta_create_post = function (req, res){
    var aBici = new Bicicleta({code: req.body.code, color: req.body.color, modelo: req.body.modelo});
    aBici.ubicacion = [req.body.lat, req.body.lng];
    Bicicleta.add(aBici, (err, newBici) => {
        if (err) console.log(err);
        res.redirect("/bicicletas")
    });
}

exports.bicicleta_update_get = async function (req, res){
    var bici = await Bicicleta.findByCode(req.params.code)
    res.render("bicicletas/update",{bici})
}


exports.bicicleta_update_post = async function (req, res){
    var bici = await Bicicleta.findByCode(req.params.code)
    bici.code = req.body.code;
    bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = [req.body.lat,req.body.lng];
    Bicicleta.updateByCode(req.params.code, bici, (err, newBici) => {
        if (err) console.log(err);
        res.redirect("/bicicletas")
    });
}

exports.bicicleta_delete_post = function (req, res){
    Bicicleta.removeByCode(req.body.code, (err, newBici) => {
        if (err) console.log(err);
        res.redirect("/bicicletas")
    });
}
