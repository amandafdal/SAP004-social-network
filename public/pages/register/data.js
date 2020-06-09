
export function getCredentials(parameterEmail, passwordParameter) {
    return firebase.auth.EmailAuthProvider.credential(parameterEmail, passwordParameter);
}

export function linkUser(credentialsToConnectTheUser) {
    firebase.auth().currentUser
    .linkWithCredential(credentialsToConnectTheUser)
    .then((cred) => {
        const user = cred.user;
        recordUserToBase(user.uid, name, email);
    })
    .catch((error) => {
    console.log(error);
    })
}


export function recordUserToBase(uidUser, nameUser, emailUser) {
    firebase.database().ref('usuarios').child(uidUser).set({uidUser, nameUser, emailUser});
}