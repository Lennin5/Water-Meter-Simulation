
// Inicializate App - Upload Simulation of Water

var countdown_green = 10;
var countdown_blue = 10;
var countdown_red = 10;
var countdown_yellow = 10;

var downloadTimer = setInterval(function(){
    document.getElementById("countdown-green").innerHTML = "Litros: " + countdown_green;
    document.getElementById("countdown-blue").innerHTML = "Litros: " + countdown_blue;
    document.getElementById("countdown-red").innerHTML = "Litros: " + countdown_red;
    document.getElementById("countdown-yellow").innerHTML = "Litros: " + countdown_yellow;
  countdown_green += 1;
  countdown_blue += 1;
  countdown_red += 1;
  countdown_yellow += 1;
}, 1000);

