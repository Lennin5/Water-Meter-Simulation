function SetData(){
    var uid = "user1"
    var username = "Lennin";
    var email = "l@gmail.com";
  
    firebase.firestore().collection("users").doc(uid).set({
        username: username,
        email: email,        
    }).then(response=>{
        console.log("document setted in firestore database!");          
    }).catch(error=>{
        console.log(error);
    })     
}

function AddData(){    
    var username = "Lennin";
    var email = "l@gmail.com";
  
    firebase.firestore().collection("users").add({
        username: username,
        email: email,        
    }).then(response=>{        
        console.log("document added in firestore database!");          
        console.log(response.id); // ID from document created with ADD in firestore
    }).catch(error=>{
        console.log(error);
    })     
}

function UpdateData(){
    var uid = "user1"
    var username = "LENNIN";
    var email = "l@gmail.com";
  
    firebase.firestore().collection("users").doc(uid).update({
        username: username,
        email: email,        
    }).then(response=>{
        console.log("document has been updated!");          
    }).catch(error=>{
        console.log(error);
    })     
}

function GetUniqueValue(){
    var uid = "user1"
    firebase.firestore().collection("users").doc(uid)
    .onSnapshot(doc=>{         
        if (doc.exists) {
            var user=doc.data();   // The name of this variable takes the name in singular of collection "users"        
            document.getElementById('uniqueValue').innerHTML = user.username;
        } else {        
            console.log("The document doesn't exist!");
        }
    });
}
function ClearUniqueData(){
    document.getElementById('uniqueValue').innerHTML = "The value appears here! :)";
}

function GetDataInTableRealTime(){
    firebase.firestore().collection("users")
    .onSnapshot(doc=>{ 
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
        doc.forEach(response=>{
            var user = response.data();
            contenido +="<tr>"                  
            contenido +="<td>"+response.id+"</td>"
            contenido +="<td>"+user.username+"</td>"
            contenido +="<td>"+user.email+"</td>"
          contenido +="</tr>" 
        }); 
        contenido +="</tbody>"
        contenido +="</table>"              
      contenido +="</div>"
    document.getElementById("divTableRealTime").innerHTML = contenido;  
    }); 
}
function ClearDataInTableRealTime(){
    document.getElementById("divTableRealTime").innerHTML = "";
}

function GetDataInTableNoRealTime(){
    firebase.firestore().collection("users")
    .get().then((querySnapshot) => {
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
        querySnapshot.forEach((response) => {
            var user = response.data();
            // console.log(user.email);
            contenido +="<tr>"                  
            contenido +="<td>"+response.id+"</td>"
            contenido +="<td>"+user.username+"</td>"
            contenido +="<td>"+user.email+"</td>"
          contenido +="</tr>"            
        });
        contenido +="</tbody>"
        contenido +="</table>"              
      contenido +="</div>"
    document.getElementById("divTableNoRealTime").innerHTML = contenido;        
    });       
}
function ClearDataInTableNoRealTime(){
    document.getElementById("divTableNoRealTime").innerHTML = "";
}

function GetDataInCards(){    
    firebase.firestore().collection("users")
    .onSnapshot(doc=>{ 
        var contenido ="<div class='row'>"
        doc.forEach(response=>{
            var user = response.data();
            contenido +="<div class='col s12 m6 l3'>"
            contenido +="<div class='card'>"
              contenido +="<div class='card-image'>"                   
            contenido +="<img src='img/sakura.jpg' width='300' height='300' style='object-fit: cover'>"                
        contenido +="<span class='card-title'>"+user.username+"</span>"
      contenido +="</div>"
      contenido +="<div class='card-content'>"
        contenido +="<p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>"
      contenido +="</div>"
      contenido +="<div class='card-action'>"
        contenido +="<a href='#'>"+user.email+"</a>"
        contenido +="</div>"
        contenido +="</div>"
      contenido +="</div>" 
        }); 
        contenido +="</div>"
        document.getElementById("divCardsRealTime").innerHTML = contenido;
    }); 
}
function ClearDataInCards(){
    document.getElementById("divCardsRealTime").innerHTML = "";
}