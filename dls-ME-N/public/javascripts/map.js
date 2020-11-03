var mymap = L.map('mapid').setView([-34.6012424, -58.3861497], 13);
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mymap);


L.marker([-34.6012424, -58.3861497]).addTo(mymap);
L.marker([-34.6102524, -58.3871597]).addTo(mymap);
L.marker([-34.6062624, -58.3881697]).addTo(mymap);