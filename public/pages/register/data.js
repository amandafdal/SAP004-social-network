/*
export const register = (emailRegister, passwordRegister, nameRegister, callback) => {
    firebase.auth().createUserWithEmailAndPassword(emailRegister, passwordRegister)
        .then(() => {
            firebase.auth().currentUser.updateProfile({
                displayName: nameRegister
            })

            
            firebase.firestore().collection("users").doc().set({
                uid: firebase.auth().currentUser.uid,
                email: emailRegister,
                name: nameRegister,
                minibio: "Escreva sua MiniBio",
                profileimage: [],
                coverimage: []                   
            })
            
        window.location.hash = "home";
        })
        .catch(function (error) {
            callback(error.message);
        });
};
*/