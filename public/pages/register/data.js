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
                            profileimage: [],
                            coverimage: []             
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



