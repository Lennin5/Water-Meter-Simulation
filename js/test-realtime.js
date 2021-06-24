function SetData(){
    var uid = "user1"
    var username = "Lennin";
    var email = "l@gmail.com";
  
    firebase.database().ref('users/'+uid).set({
      username: username,
      email: email,    
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
    // OBTENER UN ARRAY DE UN OBJETO Y PINTARLO EN UNA TABLA - DB REAL TIME
    firebase.database().ref('users/')
    .on('value', (snapshot) => {
      var data = snapshot.val();
      // console.log(data);
      var contenido ="<div class='container'>"         
          contenido +="<table class='striped responsive-table'>"
          contenido +="<thead>"
            contenido +="<tr>"
              contenido +="<th>Uid</th>"
                contenido +="<th>Username</th>"
                contenido +="<th>Email</th>"
            contenido +="</tr>"
          contenido +="</thead>"
          contenido +="<tbody>"            
              for (let [key, value] of Object.entries(data)) {
                  contenido +="<tr>"      
                  contenido +="<td>"+data.id+"</td>"
                    contenido +="<td>"+value.username+"</td>"
                    contenido +="<td>"+value.email+"</td>"
                  contenido +="</tr>"
              }
              contenido +="</tbody>"
            contenido +="</table>"              
          contenido +="</div>"
    document.getElementById("divTableRealTime").innerHTML = contenido;
    });
}
function ClearDataInTable(){
    document.getElementById("divTableRealTime").innerHTML = "";
}

function GetDataInCards(){    
    // OBTENER UN ARRAY DE UN OBJETO Y PINTARLO EN CARDS RESPONSIVAS - DB REAL TIME
    firebase.database().ref('users/')
    .on('value', (snapshot) => {
      var data = snapshot.val();
      console.log(data);
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