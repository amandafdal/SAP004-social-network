export const register = (email, password, nameParameter, callback) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    firebase.auth().currentUser.updateProfile({
                        displayName: nameParameter
                    })

                    firebase.firestore().collection("users").get().then(function(querySnapshot) {
                        const emailArray = [];
                        querySnapshot.forEach(function(doc) {
                            emailArray.push(doc.data().email);
                        })
            
                        const booleanEmail = [];
                        for (let value of emailArray) {
                          booleanEmail.push(value == email);
                        }  
            
                        const status = booleanEmail.indexOf(true);

                        if(status == -1){
                            firebase.firestore().collection("users").doc().set({
                            uid: firebase.auth().currentUser.uid,
                            email: email,
                            name: nameParameter,
                            minibio: "Escreva sua MiniBio",
                            login: "emailAndPassword",
                            profileimage: "https://firebasestorage.googleapis.com/v0/b/social-network-sap004.appspot.com/o/mimi.png?alt=media&token=dc33f03b-706e-43f9-ba56-3468598fd730",
                            coverimage: "https://firebasestorage.googleapis.com/v0/b/social-network-sap004.appspot.com/o/cover-img.jpg?alt=media&token=8ea3250c-42c8-4880-b1c0-c4c89220f9f2"            
                            }) 
                            console.log("Email cadastrado com sucesso")
                            window.location.hash = "home"; 
                        }    
                    })                                               
                    
                })
                .catch(function (error) {
                    callback(error.message);
                })       
}
