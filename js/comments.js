function GetDataInTableRealTime(){
    firebase.firestore().collection("WaterMeterComments")
    .onSnapshot(doc=>{ 
        var contenido ="<div style='display: flex; justify-content: center'>"
        contenido +="<div style='width: 90%'>"
        contenido +="<table class='striped responsive-table'>"
        contenido +="<thead>"
            contenido +="<tr>"        
            contenido +="<th>Uid</th>"
                contenido +="<th>Name</th>"
                contenido +="<th>Email</th>"
                contenido +="<th>Comments</th>"
                contenido +="<th>Date</th>"
                contenido +="<th>Hour</th>"
            contenido +="</tr>"
            contenido +="</thead>"
            contenido +="<tbody>"           
            doc.forEach(response=>{
                var user = response.data();
                contenido +="<tr>"                  
                contenido +="<td>"+response.id+"</td>"
                contenido +="<td>"+user.name+"</td>"
                contenido +="<td>"+user.email+"</td>"
                contenido +="<td>"+user.comment+"</td>"
                contenido +="<td>"+user.date+"</td>"
                contenido +="<td>"+user.hour+"</td>"
            contenido +="</tr>" 
            }); 
        contenido +="</tbody>"
        contenido +="</table>"              
      contenido +="</div>"
      contenido +="</div>"
    document.getElementById("divComments").innerHTML = contenido;  
    }); 
}


