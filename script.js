// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD2QI-b5UHuBlLrlH5cNCDJyj_UDjKrMF4",
    authDomain: "projetoaplicativo-dc514.firebaseapp.com",
    projectId: "projetoaplicativo-dc514",
    storageBucket: "projetoaplicativo-dc514.firebasestorage.app",
    messagingSenderId: "1068651352224",
    appId: "1:1068651352224:web:a177e501bbfb3a8ac1f9c5"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Get the form element
const userDataForm = document.getElementById('userDataForm');

// Add a submit event listener to the form
userDataForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    // Get the user data from the form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Create a new user document in Firestore
    db.collection('usuarios').add({
        name: name,
        email: email
    })
    .then((docRef) => {
        console.log("Document written with ID:", docRef.id);
        // Display a success message or redirect to another page
    })
    .catch((error) => {
        console.error("Error adding document:", error);
        // Display an error message to the user
    });
});
