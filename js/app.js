function Login() {

  var email = document.getElementById('emailLogin').value;
  var password = document.getElementById('passwordLogin').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(response => {
      window.location.href = "./index.html";
    })
    .catch(error => {      
      alert(error);
      //Aquí aplicaría los errores de contraseña incorrecta, el usuario no existe, etc.
    });
}

function Logout() {
  firebase.auth().signOut()
    .then(function () {
      window.location = './index.html';
    })
    .catch(function (error) {
      console.log(error)
    })
}