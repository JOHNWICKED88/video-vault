import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD0gnqjaCe2Xu5p12bh4r0HrCYGEYLhAxU",
  authDomain: "video-vault-68225.firebaseapp.com",
  projectId: "video-vault-68225",
  storageBucket: "video-vault-68225.firebasestorage.app",
  messagingSenderId: "992307954522",
  appId: "1:992307954522:web:2782fe2443eff969d2a963"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// AUTH
window.signup = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .catch(alert);
};

window.login = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .catch(alert);
};

onAuthStateChanged(auth, user => {
  if (user) {
    authDiv.style.display = "none";
    appDiv.style.display = "block";
    loadVideos();
  }
});

// ADD VIDEO
window.addVideo = async () => {
  await addDoc(collection(db, "videos"), {
    title: title.value,
    link: link.value,
    thumb: thumb.value
  });
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
        <img src="${v.thumb}" width="200"><br>
        <a href="${v.link}" target="_blank">Watch</a>
      </div>`;
  });
}

const authDiv = document.getElementById("auth");
const appDiv = document.getElementById("app");
