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
const storage = firebase.storage();

// Get the form element
const dataForm = document.getElementById('dataForm');

// Add a submit event listener to the form
dataForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    // Get the form data
    const option = document.getElementById('option').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];

    // Handle file upload (if a file is selected)
    let fileURL = "";
    if (file) {
        const storageRef = storage.ref();
        const fileRef = storageRef.child(`uploads/${file.name}`);
        const uploadTask = fileRef.put(file);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state changes, you can display progress here
            },
            (error) => {
                // Handle unsuccessful uploads
                console.error("Error uploading file:", error);
            },
            () => {
                // Upload completed successfully
                uploadTask.snapshot.ref.getDownloadURL()
                .then((url) => {
                    fileURL = url;
                    // Store data in Firestore
                    db.collection('formData').add({
                        option: option,
                        title: title,
                        description: description,
                        fileURL: fileURL
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
            }
        );
    } else {
        // Store data in Firestore without a file
        db.collection('formData').add({
            option: option,
            title: title,
            description: description
        })
        .then((docRef) => {
            console.log("Document written with ID:", docRef.id);
            // Display a success message or redirect to another page
        })
        .catch((error) => {
            console.error("Error adding document:", error);
            // Display an error message to the user
        });
    }
});
