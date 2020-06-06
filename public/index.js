import routes from "./routes.js";

const main = document.querySelector("#root");

const init = () => {
    window.addEventListener("hashchange", () => {
        renderPage()
    })
}

const renderPage = () => {
    main.innerHTML = "";
    const page = validateHash(window.location.hash);
    main.appendChild(routes[page]);
}

const validateHash = (hash) => hash === "" ? "login" : hash.replace("#", "");

<<<<<<< HEAD
// FIREBASE
=======
window.addEventListener("load", () => {
    renderPage();
    init();
})
>>>>>>> c8ec674009ccc4226c73646f222f943c1ebcc38b

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
  