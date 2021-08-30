window.onload = function() {

    // TRAER LAS ULTIMAS 5 FECHAS DE LUNES-VIERNES
    const lastDays = [];   // Declaramos una constante que almacenará nuestro array de dias (ultimo viernes, jueves, miercoles, martes y lunes)
    for (let i = 0; i < 5; i++) {  // Realizar for para repetir proceso de obtención de "lastXDay", Nota: el 5 significa el número de días para atrás [lun, mar, mier, juev, vier]
        const algorithmConstant= new Date().getDate() + (6 - new Date().getDay() - 1)  - (new Date().getDay() == 6 ? 0+i : 7+i); // Constante algoritmica que hace el cálculo del último xDay, Nota: ponemos 0+i para ir sumando y 7-i para ir restando y así ir obteniendo los datos de las ultimas fechas
        var lastXDay = new Date() // Declaramos fecha normal
        lastXDay.setDate(algorithmConstant); // A nuestra fecha actual le pasamos la constante algoritmica como parámetro en .getDate(algorithmConstant);
        lastXDay = lastXDay.getDate() + "-" + [lastXDay.getMonth()+1] + "-" + lastXDay.getFullYear();  // Hacemos el formato que tendrá n nuestras fechas por separado, en mi caso d-m-yyyy   
        // const countLastXDays = lastDays.push(lastXDay); // Opcional* llamamos a countLastXDays para saber el número de fechas en nuestro array
        lastDays.push(lastXDay); // Por cada ciclo en el for se va a ir agregando la nueva fecha de ultimo viernes, jueves, miercoles, etc... dependiendo cuántas fechas atrás hayamos programado
    }    
    // console.log(lastDays[0]); // Obtener el último [0]viernes, [1]jueves, [2]miercoles, etc...
    console.log(lastDays); // Imprimimos nuestro array con las últimas 5 fechas a partir del último viernes
    document.getElementById("last5Days").innerText = lastDays;

    // TRAER LA FECHA DE AYER
    var tomorrowDay = new Date();
    tomorrowDay.setDate(tomorrowDay.getDate()-1);
    tomorrowDay = tomorrowDay.getDate() + "-" + [tomorrowDay.getMonth()+1] + "-" + tomorrowDay.getFullYear();
   
    console.log(tomorrowDay); // Imprimimos nuestro array con las últimas 5 fechas a partir del último viernes        
    document.getElementById("tomorrowsDate").innerText = tomorrowDay;
}