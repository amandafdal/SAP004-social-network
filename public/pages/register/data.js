export const register = (email, password, nameParameter, callback) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    firebase.auth().currentUser.updateProfile({
                        displayName: nameParameter
                    })

                    firebase.auth().onAuthStateChanged(function(user) {
                        if (user) {
                            firebase.firestore().collection("users").doc().set({
                                uid: firebase.auth().currentUser.uid,
                                email: email,
                                name: nameParameter,
                                minibio: "Escreva sua MiniBio",
                                profileimage: [],
                                coverimage: []             
                            }) 

                            window.location.hash = "home"; 
                        }
                    })  
                }) 
                .catch(function (error) {
                    callback(error.message);
                })       
};

