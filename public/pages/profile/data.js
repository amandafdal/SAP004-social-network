// PARA ATUALIZAR O displayName:  OK
export function updateDisplayName(newNameContainerParameter){
    firebase.auth().currentUser.updateProfile({
      displayName: newNameContainerParameter
    })
    .then(function() {
        console.log("displayName successfully updated!");
    })
}

// PARA ATUALIZAR MINIBIO: OK
export function updateUserDoc(uidParameter, newNameParameter, newEmailParameter, newMinibioParameter){

    firebase.firestore().collection("users").where("uid", "==", uidParameter)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            firebase.firestore().collection("users").doc(doc.id).update({
            name: newNameParameter,
            email: newEmailParameter,
            minibio: newMinibioParameter
            })
            .then(function() {
                console.log("Document successfully updated!");
            })
            .catch(function(error) {
                console.error("Error updating document: ", error);
            })
        })
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    })

}

//PARA REAUTENTICAR O USER: OK
export function reauthenticateUser(oldPasswordParameter) {
    return firebase.auth.EmailAuthProvider.credential(
        firebase.auth().currentUser.email, 
        oldPasswordParameter
    )
}

//PARA ATUALIZAR EMAIL: OK
export function emailUpdate(authenticateParameter, newEmailParameter){
    firebase.auth().currentUser.reauthenticateWithCredential(authenticateParameter).then(function() {
        firebase.auth().currentUser.updateEmail(newEmailParameter).then(function() {
        })
    })
}

//PARA ATUALIZAR A SENHA: OK
export function passwordUpdate(authenticateParameter, newPasswordParameter){
    firebase.auth().currentUser.reauthenticateWithCredential(authenticateParameter).then(function() {
        firebase.auth().currentUser.updatePassword(newPasswordParameter).then(function() {
        console.log("Update password successful")
        }).catch(function(error) {
        console.log("An error happened")
        });
    })
}