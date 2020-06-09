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


window.addEventListener("load", () => {
    renderPage();
    init();
})

/*
//--- REGISTRO
firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
});


//--- LOGIN
firebase
.auth()
.signInWithEmailAndPassword(email, password)
.catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
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
  
// ------------------------------------------------------------------------------------

//app.auth().signOut();
//app.auth().signInAnonymously().then(user=>{
//  app.database().ref('informacoes').on('value', snapshot=>{ console.log(snapshot.val())
//  })
// }
//const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();

document.getElementById("create-account-btn").addEventListener("click", () =>{
const email = document.getElementById("user-email").value; 
const name = document.getElementById("user-name").value;
const password = document.getElementById("user-password").value;
const passwordConfirm = document.getElementById("user-password-confirm").value;

  while (password !== passwordConfirm) {
    alert("As senhas não são iguais!");
  }

  if (auth.currentUser) {
    const credentials = getCredentials(email, password);
    linkUser(credentials);
  }else{
    auth.createUserWithEmailAndPassword(email, password).then((credentials) => {
      recordUserToBase(credentials.user.uid, name, email);
    })
  }
})

function getCredentials(parameterEmail, passwordParameter) {
  return firebase.auth.EmailAuthProvider.credential(parameterEmail, passwordParameter);
}

function linkUser(credentialsToConnectTheUser) {
  auth.currentUser
  .linkWithCredential(credentialsToConnectTheUser)
  .then((cred) => {
    const user = cred.user;
    recordUserToBase(user.uid, name, email);
  })
  .catch((error) => {
    console.log(error);
  })
}

function recordUserToBase(uidUser, nameUser, emailUser) {
  db.ref('uruarios').child(uidUser).set({uidUser, nameUser, emailUser});
}

*/