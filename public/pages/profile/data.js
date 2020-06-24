export function updateDisplayName(newNameContainerParameter){
    firebase.auth().currentUser.updateProfile({
      displayName: newNameContainerParameter
    })
    .then(function() {
        console.log("displayName successfully updated!");
    })
}

export function reauthenticateUser(oldPasswordParameter) {
    return firebase.auth.EmailAuthProvider.credential(
        firebase.auth().currentUser.email, 
        oldPasswordParameter
    )
}

export function emailUpdate(authenticateParameter, newEmailParameter){
    firebase.auth().currentUser.reauthenticateWithCredential(authenticateParameter).then(function() {
        firebase.auth().currentUser.updateEmail(newEmailParameter).then(function() {
        })
    })
}

export function passwordUpdate(authenticateParameter, newPasswordParameter){
    firebase.auth().currentUser.reauthenticateWithCredential(authenticateParameter).then(function() {
        firebase.auth().currentUser.updatePassword(newPasswordParameter).then(function() {
        console.log("Update password successful")
        }).catch(function(error) {
        console.log("An error happened")
        });
    })
}

export function updateUserDocName(uidParameter, newNameParameter){

    firebase.firestore().collection("users").where("uid", "==", uidParameter)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            firebase.firestore().collection("users").doc(doc.id).update({
            name: newNameParameter
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

export function updateUserDocEmail(uidParameter, newEmailParameter){

    firebase.firestore().collection("users").where("uid", "==", uidParameter)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            firebase.firestore().collection("users").doc(doc.id).update({
            email: newEmailParameter
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

export function updateUserDocMiniBio(uidParameter, newMinibioParameter){

    firebase.firestore().collection("users").where("uid", "==", uidParameter)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            firebase.firestore().collection("users").doc(doc.id).update({
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

export function updateProfilePicture(fileParameter, uploaderParameter){

   const task = firebase.storage().ref('images/' + fileParameter.name).put(fileParameter);

   task.then(function(snapshot) {
     console.log('Uploaded a blob or file!');
     return snapshot.ref.getDownloadURL()
     
   }).then((url) =>{

        firebase.firestore().collection("users").where("uid", "==", firebase.auth().currentUser.uid)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                firebase.firestore().collection("users").doc(doc.id).update({
                    profileimage: url
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

        document.querySelector("#profile-img-template").src = url;
    })


   task.on('state_changed',    
        function progress(snapshot){
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploaderParameter.value = percentage;  
        },    
        function error(err){    
        },     
        function complete(){
        }
    )
}

export function updateCoverImage(fileParameter, uploaderParameter){

    const task = firebase.storage().ref('images/' + fileParameter.name).put(fileParameter);
 
    task.then(function(snapshot) {
      console.log('Uploaded a blob or file!');
      return snapshot.ref.getDownloadURL()
      
    }).then((url) =>{
 
         firebase.firestore().collection("users").where("uid", "==", firebase.auth().currentUser.uid)
         .get()
         .then(function(querySnapshot) {
             querySnapshot.forEach(function(doc) {
                 firebase.firestore().collection("users").doc(doc.id).update({
                    coverimage: url
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
 
         document.querySelector(".profile-cover-profile").style.backgroundImage = `url("${url}")`;
     })
 
 
    task.on('state_changed',    
         function progress(snapshot){
             var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
             uploaderParameter.value = percentage;  
         },    
         function error(err){    
         },     
         function complete(){
         }
     )
 }
 