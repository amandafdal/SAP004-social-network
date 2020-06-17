export const createMiniBio = (idUser, text) => {
    firebase.firestore().collection("minibio").add({
      user: idUser,
      minibiodesc: text
    })
  }


  export function mostrarDados(local, nameUser, emailUser){
    let nome = document.createElement("p");
    let email = document.createElement("p");
    let miniBio = document.createElement("p");
  
    nome.className += "user-name";
    email.className += "user-bio";
    miniBio.className += "user-bio";

    nome.innerHTML = nameUser;
    email.innerHTML = emailUser;
    miniBio.innerHTML = "Escreva sua MiniBio";

  
    local.appendChild(nome);
    local.appendChild(email);
    local.appendChild(miniBio);
}