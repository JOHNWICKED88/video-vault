import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Replace this with YOUR Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD0gnqjaCe2Xu5p12bh4r0HrCYGEYLhAxU",
  authDomain: "video-vault-68225.firebaseapp.com",
  projectId: "video-vault-68225",
  storageBucket: "video-vault-68225.firebasestorage.app",
  messagingSenderId: "992307954522",
  appId: "1:992307954522:web:2782fe2443eff969d2a963"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Elements
const email = document.getElementById("email");
const password = document.getElementById("password");
const title = document.getElementById("title");
const link = document.getElementById("link");
const videos = document.getElementById("videos");
const authDiv = document.getElementById("auth");
const appDiv = document.getElementById("app");

// SIGN UP
window.signup = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .catch(alert);
};

// LOGIN
window.login = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .catch(alert);
};

// AUTH STATE
onAuthStateChanged(auth, user => {
  if (user) {
    authDiv.style.display = "none";
    appDiv.style.display = "block";
    loadVideos();
  }
});

// ADD VIDEO
window.addVideo = async () => {
  if(title.value.trim() === "" || link.value.trim() === "") {
    alert("Please enter both title and link");
    return;
  }
  await addDoc(collection(db, "videos"), {
    title: title.value,
    link: link.value
  });
  title.value = "";
  link.value = "";
  loadVideos();
};

// LOAD VIDEOS
async function loadVideos() {
  videos.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "videos"));
  querySnapshot.forEach(doc => {
    const v = doc.data();
    videos.innerHTML += `
      <div class="video">
        <h3>${v.title}</h3>
        <a href="${v.link}" target="_blank">Watch</a>
      </div>`;
  });
}
