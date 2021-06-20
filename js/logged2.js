
function SetData(){
    var uid = "user5"
    var username = "Díaz";
    var email = "d@gmail.com";
  
    firebase.database().ref('users/'+uid).set({
      username: username,
      email: email,    
    }).then(response=>{      
      console.log("document writed!");               
    }).catch(error =>{
      console.log(error);
    });   
  
  }

function GetDataDBRealTime(){
    // OBTENER EL VALOR DE UN CAMPO EN ESPECÍFICO CON UNA RUTA ESPECÍFICA - DB REAL TIME
    // var monthLitersConsumed = document.getElementById('monthLitersConsumed');
    // var dbRef = firebase.database().ref("users/user1/").child('username');
    // dbRef.on('value', snap => monthLitersConsumed.innerHTML = snap.val());

    
    // OBTENER UN ARRAY DE UN OBJETO Y PINTARLO EN CARDS RESPONSIVAS - DB REAL TIME
    // var starCountRef = firebase.database().ref('users/');
    // starCountRef.on('value', (snapshot) => {
    //   var data = snapshot.val();
    //   console.log(data);
    //   var contenido ="<div class='row'>"         
    //           for (let [key, value] of Object.entries(data)) {
    //             contenido +="<div class='col s12 m6 l3'>"
    //             contenido +="<div class='card'>"
    //               contenido +="<div class='card-image'>"                   
    //             contenido +="<img src='img/london.jpg' width='300' height='300' style='object-fit: cover'>"                
    //         contenido +="<span class='card-title'>"+value.username+"</span>"
    //       contenido +="</div>"
    //       contenido +="<div class='card-content'>"
    //         contenido +="<p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>"
    //       contenido +="</div>"
    //       contenido +="<div class='card-action'>"
    //         contenido +="<a href='#'>"+value.email+"</a>"
    //         contenido +="</div>"
    //         contenido +="</div>"
    //       contenido +="</div>"            
    //           }
    // contenido +="</div>"
    // document.getElementById("divTable").innerHTML = contenido;
    // });
    

    // OBTENER UN ARRAY DE UN OBJETO Y PINTARLO EN UNA TABLA - DB REAL TIME
    var starCountRef = firebase.database().ref('users/');
    starCountRef.on('value', (snapshot) => {
      var data = snapshot.val();
      console.log(data);
      var contenido ="<div class='container'>"         
          contenido +="<table class='striped responsive-table'>"
          contenido +="<thead>"
            contenido +="<tr>"
                contenido +="<th>Username</th>"
                contenido +="<th>Email</th>"
            contenido +="</tr>"
          contenido +="</thead>"
          contenido +="<tbody>"            
              for (let [key, value] of Object.entries(data)) {
                  contenido +="<tr>"      
                    contenido +="<td>"+value.username+"</td>"
                    contenido +="<td>"+value.email+"</td>"
                  contenido +="</tr>"
              }
              contenido +="</tbody>"
            contenido +="</table>"              
          contenido +="</div>"
    document.getElementById("divTable").innerHTML = contenido;
    });



    //   var contenido = "<table>"
    //     contenido+="<thead>"
    //   contenido+="<tr>"
          
    //       contenido+="<th>Username</th>"
    //       contenido+="<th>Email</th>"

    //   contenido+="</tr>"
    //   contenido+="</thead>"

    //   contenido+="<tbody>"      
      
    //   for (let [key, value] of Object.entries(data)) {

    //     contenido+="<tr>"
    //     contenido+="<td>"+value.username+"</td>"
    //     contenido+="<td>"+value.email+"</td>"

    //     console.log(value.username);

    //   }

    //   contenido+="</tbody>"
    //   contenido+="</table>"
    //   document.getElementById("divTable").innerHTML = contenido;
    // });



  }
  
  
  // Inicializate App - Upload Simulation of Water
  
  var countdown_green = 10;
  var countdown_blue = 10;
  var countdown_red = 10;
  var countdown_yellow = 10;
  
  var downloadTimer = setInterval(function(){
      document.getElementById("countdown-green").innerHTML = countdown_green;
      document.getElementById("countdown-blue").innerHTML = countdown_blue;
      document.getElementById("countdown-red").innerHTML = countdown_red;
      document.getElementById("countdown-yellow").innerHTML = countdown_yellow;
    countdown_green += 1;
    countdown_blue += 1;
    countdown_red += 1;
    countdown_yellow += 1;
  }, 1000);
  
  
  function getDate(option){
  
    var daysOfWeekInLetter = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var monthsInLetter = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];  
  
    var d = new Date();      
    switch (option) {
      case 'day':
          return d.getDate(); // return the day as a number (1-31)
        break;  
      case 'dayOfWeekInLetter':
          return daysOfWeekInLetter[d.getDay()]; // return the day of week in letter
        break;        
      case 'month':
          return d.getMonth()+1; // return the month as a number (1-12)
        break;
      case 'monthInLetter':
          return monthsInLetter[d.getMonth()]; // return the month  in letter
        break;
      case 'today':
          return d.getDate() + '-' + [d.getMonth()+1] + '-' + d.getFullYear(); // return the date in format dd-m-yyyy
        break;   
      case 'year':
          return d.getFullYear(); // return the year as a number (2021)
        break;     
      case 'dateTime':
        return d.getDate() + '-' + [d.getMonth()+1] + '-' + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        break;
      default:
          return false;
        break;
    }
  }
  
  
  // Send data to FIRESTORE
  async function SendDataSensor01(){
    // sensor's name
    var sensorName = "Sensor01";
    // actual variable of water consumption to ADD in day, SUM in month&year
    var actualLitersOfConsumption = document.getElementById("countdown-green").innerHTML;
  
    // variables repo that will be or not contain liters of month&year
    var monthLitersConsumed = 0;
    var yearLitersConsumed = 0;
  
    // variables to use in the day, month and year document's data
    var day = getDate('day');
    var dayOfWeekInLetter = getDate('dayOfWeekInLetter');
    var month = getDate('month');
    var monthInLetter = getDate('monthInLetter');
    var today = getDate('today');
    var year = getDate('year');  
    var dateTime = getDate('dateTime');
    var timestamp = firebase.firestore.FieldValue.serverTimestamp();
  
    // console.log();
  
    // variables converted in string to route of push data
    var dayMonthYearString = day+"-"+month+"-"+year;
    var monthYearString = month+"-"+year;  
    var yearString = year;
  
    // filters of type of variables
    actualLitersOfConsumption = parseInt(actualLitersOfConsumption);
    dayMonthYearString = dayMonthYearString.toString();
    monthYearString = monthYearString.toString();  
    yearString = yearString.toString();
      
    
    // verify if user exists
    var user = firebase.auth().currentUser;
    var db = firebase.firestore();
    var uid;    
  
    if (user != null) {
      uid = user.uid;      
  


      // GET liters of water of Month to sum
      await db.collection(uid).doc("Water_Consumption_Data").collection("Months").doc(monthYearString).get()
      .then(response=>{      
          var document = response.data();      
          monthLitersConsumed = document.Month_Liters_Consumed;           
      }).catch(error =>{
        // console.log(error); // ERROR DISABLED XD
      });
      // GET liters of water of Year to sum
      await db.collection(uid).doc("Water_Consumption_Data").collection("Years").doc(yearString).get()
      .then(response=>{      
          var document = response.data();      
          yearLitersConsumed = document.Year_Liters_Consumed;           
      }).catch(error =>{
        // console.log(error); // ERROR DISABLED XD
      });    
      
        await firebase.database().ref(uid+'/Water_Consumption_Data/Days/'+dayMonthYearString).set({
            Day: day,
            Day_Of_Week_In_Letter: dayOfWeekInLetter,
            Liters_Consumed: actualLitersOfConsumption,
            Month: month,
            Month_In_Letter: monthInLetter,
            Timestamp: timestamp,
            Today: today,    
        })      
        // Set data of day of consumption
        await db.collection(uid).doc("Water_Consumption_Data").collection("Days").doc(dayMonthYearString).set({
          Day: day,
          Day_Of_Week_In_Letter: dayOfWeekInLetter,
          Liters_Consumed: actualLitersOfConsumption,
          Month: month,
          Month_In_Letter: monthInLetter,
          Timestamp: timestamp,
          Today: today,        
        })
        // Set data of "X" sensor data of consumption
        await db.collection(uid).doc("Water_Consumption_Data").collection("Days").doc(dayMonthYearString).collection("Sensors").doc(sensorName).set({
          Liters_Consumed: actualLitersOfConsumption,
          Sensor_Name: sensorName
        })      
        // Set data of month of consumption
        await db.collection(uid).doc("Water_Consumption_Data").collection("Months").doc(monthYearString).set({
          Month: month,
          Month_In_Leter: monthInLetter,
          Month_Liters_Consumed: actualLitersOfConsumption + monthLitersConsumed,
          Year: year
        })
        // Set data of year of consumption
        await db.collection(uid).doc("Water_Consumption_Data").collection("Years").doc(yearString).set({
          Year: year,
          Year_Liters_Consumed: actualLitersOfConsumption + yearLitersConsumed
        })      
        .then(() => {
            console.log("Document successfully written in day, month and year!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        }); 
  
  
    } else {
      console.log("User doesn't exist. Try again later!");
    }   
  }    
    