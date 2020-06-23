export const loginGoogle = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(function () {

            firebase.firestore().collection("users").get().then(function(querySnapshot) {
                const emailArray = [];
                querySnapshot.forEach(function(doc) {
                    emailArray.push(doc.data().email);
                })
                
                const booleanEmail = [];
                for (let value of emailArray) {
                    booleanEmail.push(value === firebase.auth().currentUser.email);
                }  
                
                console.log(booleanEmail)
                const status = booleanEmail.indexOf(true);

                if(status === -1){
                    firebase.firestore().collection("users").doc().set({
                    uid: firebase.auth().currentUser.uid,
                    email: firebase.auth().currentUser.email,
                    name: firebase.auth().currentUser.displayName,
                    minibio: "Escreva sua MiniBio",
                    profileimage: [],
                    coverimage: []             
                    }) 
                    window.location.hash = "home"; 
                }else{
                    window.location.hash = "home"; 
                }
                   
            }) 
        });
};

export const login = (email, password, callback) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function () {
            
            window.location.hash = "home";
        })
        .catch(function (error) {
            callback(error.message);
        });
};