function SetData(){
    var uid = "user5"
    var username = "Rosa";
    var email = "r@gmail.com";
  
    firebase.database().ref('users/'+uid).set({
      username: username,
      email: email,    
      Timestamp: firebase.database.ServerValue.TIMESTAMP,
    }).then(response=>{      
      console.log("document writed in realtime database!");               
    }).catch(error =>{
      console.log(error);
    });   
  
  }

function GetUniqueValue(){
    // OBTENER EL VALOR DE UN CAMPO EN ESPECÍFICO CON UNA RUTA ESPECÍFICA - DB REAL TIME
    var uniqueValue = document.getElementById('uniqueValue');
    var dbRef = firebase.database().ref("users/user1/").child('username');
    dbRef.on('value', snap => uniqueValue.innerHTML = snap.val());
}
function ClearUniqueData(){
    document.getElementById('uniqueValue').innerHTML = "The value appears here! :)";
}

function GetDataInTable(){


    // OBTENER UN ARRAY DE UN OBJETO Y PINTARLO EN UNA TABLA - DB REAL TIME <<<TRAER PRIMERO LOS ULTIMOS DATOS REGISTRADOS>>>
    firebase.database().ref('users')
    .on('value', (snapshot) => {
      var data = snapshot.val();
      // 1. Convertimos el objeto <data> de firebase en array <arrayDataReverse>
      var arrayData = Object.values(data);
      // 2. Invertimos el array <arrayDataReverse>
      arrayDataReverse = arrayData.reverse();
      // 3. Convertimos el array invertido <arrayDataReverse> en objeto de nuevo inicial PERO con los datos invertidos <dataReverse>
      // console.log(arrayDataReverse[4].username); // ejemplo para obtener datos del obj convertido en array      
      var dataReverse = {};
      for (var i = 0; i < arrayDataReverse.length; ++i){
        dataReverse[i] = arrayDataReverse[i];           
      }
      // console.log(dataReverse);
      // Conclusión: El arreglo de datos de firebase viene de forma ascendiente (el último registro ingresado será el último)
      // Si queremos el listado descendiente debemos usar <<dataReverse>> en el for (el úlimo registro registrado será el primero)      
      var contenido ="<div class='container'>"         
          contenido +="<table class='striped responsive-table'>"
          contenido +="<thead>"
            contenido +="<tr>"
              contenido +="<th>Timestamp</th>"
                contenido +="<th>Username</th>"
                contenido +="<th>Email</th>"
            contenido +="</tr>"
          contenido +="</thead>"
          contenido +="<tbody>"            
              for (let [key, value] of Object.entries(dataReverse)) {
                  contenido +="<tr>"      
                  contenido +="<td>"+value.Timestamp+"</td>"
                    contenido +="<td>"+value.username+"</td>"
                    contenido +="<td>"+value.email+"</td>"
                  contenido +="</tr>"
              }
              contenido +="</tbody>"
            contenido +="</table>"              
          contenido +="</div>"
    document.getElementById("divTableRealTime").innerHTML = contenido;
    });

    // OBTENER UN ARRAY DE UN OBJETO Y PINTARLO EN UNA TABLA - DB REAL TIME <<< NORMAL >>>
    // firebase.database().ref('users')
    // .on('value', (snapshot) => {
    //   var data = snapshot.val();          
    //   var contenido ="<div class='container'>"         
    //       contenido +="<table class='striped responsive-table'>"
    //       contenido +="<thead>"
    //         contenido +="<tr>"
    //           contenido +="<th>Timestamp</th>"
    //             contenido +="<th>Username</th>"
    //             contenido +="<th>Email</th>"
    //         contenido +="</tr>"
    //       contenido +="</thead>"
    //       contenido +="<tbody>"            
    //           for (let [key, value] of Object.entries(data)) {
    //               contenido +="<tr>"      
    //               contenido +="<td>"+value.Timestamp+"</td>"
    //                 contenido +="<td>"+value.username+"</td>"
    //                 contenido +="<td>"+value.email+"</td>"
    //               contenido +="</tr>"
    //           }
    //           contenido +="</tbody>"
    //         contenido +="</table>"              
    //       contenido +="</div>"
    // document.getElementById("divTableRealTime").innerHTML = contenido;
    // });    
}
function ClearDataInTable(){
    document.getElementById("divTableRealTime").innerHTML = "";
}

function GetDataInCards(){    
    // OBTENER UN ARRAY DE UN OBJETO Y PINTARLO EN CARDS RESPONSIVAS - DB REAL TIME
    firebase.database().ref('users/')
    .on('value', (snapshot) => {
      var data = snapshot.val();
      // console.log(data);
      var contenido ="<div class='row'>"         
              for (let [key, value] of Object.entries(data)) {
                contenido +="<div class='col s12 m6 l3'>"
                contenido +="<div class='card'>"
                  contenido +="<div class='card-image'>"                   
                contenido +="<img src='img/london.jpg' width='300' height='300' style='object-fit: cover'>"                
            contenido +="<span class='card-title'>"+value.username+"</span>"
          contenido +="</div>"
          contenido +="<div class='card-content'>"
            contenido +="<p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>"
          contenido +="</div>"
          contenido +="<div class='card-action'>"
            contenido +="<a href='#'>"+value.email+"</a>"
            contenido +="</div>"
            contenido +="</div>"
          contenido +="</div>"            
              }
    contenido +="</div>"
    document.getElementById("divCardsRealTime").innerHTML = contenido;
    });
  }
function ClearDataInCards(){
    document.getElementById("divCardsRealTime").innerHTML = "";
}