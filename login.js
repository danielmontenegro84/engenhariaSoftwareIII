// login.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD2QI-b5UHuBlLrlH5cNCDJyj_UDjKrMF4",
    authDomain: "projetoaplicativo-dc514.firebaseapp.com",
    projectId: "projetoaplicativo-dc514",
    storageBucket: "projetoaplicativo-dc514.firebasestorage.app",
    messagingSenderId: "1068651352224",
    appId: "1:1068651352224:web:a177e501bbfb3a8ac1f9c5"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User registered:", userCredential.user);
        document.getElementById('registerMessage').textContent = "User registered successfully!";
    } catch (error) {
        console.error("Registration error:", error.code, error.message);
        document.getElementById('registerMessage').textContent = "Failed to register user.";
    }
});

// Get the login form element
const loginForm = document.getElementById('loginForm');

// Add a submit event listener to the form
loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    // Get the email and password from the form
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Attempt to sign in the user
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // User signed in successfully
            const user = userCredential.user;
            console.log("User signed in:", user.uid);
            // Redirect to the desired page after successful login
            window.location.href = "form.html"; // Replace with your actual dashboard page
        })
        .catch((error) => {
            // Handle login errors
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Login error:", errorCode, errorMessage);
            // Display an error message to the user
            document.getElementById('loginMessage').textContent = "Invalid email or password.";
        });
});

export default function login() {
    // ... your existing login function code ...
}
