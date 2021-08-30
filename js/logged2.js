// ==============================================
// ||                                          ||
// ||                                          ||
// ||                REALTIME DATABASE         ||
// ||                                          ||
// ||                                          ||
// ==============================================

// Inicializate App - Upload Simulation of Water
  var countdown_green = 95;
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
  
  
  // Send data to REAL TIME DATABASE
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
    var uid;  
  
    if (user != null) {
      uid = user.uid;      
  


      // GET liters of water of Month to sum
      await firebase.database().ref(uid+"/Water_Consumption_Data/Months/"+monthYearString).child('Month_Liters_Consumed')
      .on('value', snap => monthLitersConsumed = snap.val());
      // GET liters of water of Year to sum
      await firebase.database().ref(uid+"/Water_Consumption_Data/Years/"+yearString).child('Year_Liters_Consumed')
      .on('value', snap => yearLitersConsumed = snap.val());

      // ---------------------------------------------------------
      
        // Set data of day of consumption
        await firebase.database().ref(uid+"/Water_Consumption_Data/Days/"+dayMonthYearString).set({        
            Day: day,
            Day_Of_Week_In_Letter: dayOfWeekInLetter,
            Liters_Consumed: actualLitersOfConsumption,
            Month: month,
            Month_In_Letter: monthInLetter,
            Timestamp: firebase.database.ServerValue.TIMESTAMP,
            Today: today,    
        })              
        // Set data of "X" sensor data of consumption
        await firebase.database().ref(uid+"/Water_Consumption_Data/Days/"+dayMonthYearString+"/Sensors/"+sensorName).set({            
          Liters_Consumed: actualLitersOfConsumption,
          Sensor_Name: sensorName
        })      
        // Set data of month of consumption
        await firebase.database().ref(uid+"/Water_Consumption_Data/Months/"+monthYearString).set({
          Month: month,
          Month_In_Leter: monthInLetter,
          Month_Liters_Consumed: actualLitersOfConsumption + monthLitersConsumed,
          Year: year
        })
        // Set data of year of consumption
        await firebase.database().ref(uid+"/Water_Consumption_Data/Years/"+yearString).set({        
          Year: year,
          Year_Liters_Consumed: actualLitersOfConsumption + yearLitersConsumed
        })      
        .then(() => {
            console.log("Document successfully written in day, month and year!");
            M.toast({html: 'Document successfully written in day, month and year!'})
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        }); 
  
  
    } else {
      console.log("User doesn't exist. Try again later!");
    }   
  }    
    
