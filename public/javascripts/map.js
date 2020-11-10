var mymap = L.map('mapid').setView([-34.6012424, -58.3861497], 13);
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mymap);

$.ajax({
    datType: "json",
    url: "api/bicicletas",
    success: function(res) {
        console.log(res);
        res.bicicletas.forEach( function(bici){
            L.marker(bici.ubicacion, {title: bici.code}).addTo(mymap);
        })
    }
})
//-34.6012424, -58.3861497