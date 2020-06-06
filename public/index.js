// Este é o ponto de entrada de sua aplicação
//import { home } from './pages/home/main.js';
//import routes from "./routes.js";


window.addEventListener("load", () =>{
    //document.querySelector('#root').appendChild(routes);

})


// FIREBASE

//--- REGISTRO
firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
});


//--- LOGIN
firebase
.auth()
.signInWithEmailAndPassword(email, password)
.catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

  //--- COLETAR DADOS
  firebase
  .auth()
  .onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var photoURL = user.photoURL;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
    }
  });
  