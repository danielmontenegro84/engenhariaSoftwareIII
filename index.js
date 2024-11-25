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
const auth = firebase.auth();

// Get the login form and message elements
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

// Add a submit event listener to the login form
loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    // Get the email and password from the form
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Attempt to sign in the user
    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // User is logged in
        const user = userCredential.user;
        console.log("User logged in:", user.uid);
        loginMessage.textContent = "Login successful!";
        loginMessage.style.color = "green";
    })
    .catch((error) => {
        // Handle login errors
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Login error:", errorCode, errorMessage);
        loginMessage.textContent = "Login failed: " + errorMessage;
        loginMessage.style.color = "red";
    });
});
