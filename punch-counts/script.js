import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getDatabase,
  ref,
  onValue,
  runTransaction
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD9c22wSj2Xc-n6DfGuWp_Rb3AD_Xr0tR0",
  authDomain: "counts-d696c.firebaseapp.com",
  projectId: "counts-d696c",
  storageBucket: "counts-d696c.firebasestorage.app",
  messagingSenderId: "751692427355",
  appId: "1:751692427355:web:bb5f396a19dd42439bcf7e",
  measurementId: "G-KTBHRKP45J"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

const OWNER_UID = "n3IboBRyPiVvbbVNhWz7wzBUaVO2";

const count1Ref = ref(db, "counters/count1");
const count2Ref = ref(db, "counters/count2");

const number1 = document.getElementById("sho");
const number2 = document.getElementById("ken");

const shoplus = document.getElementById("sho+");
const shominus = document.getElementById("sho-");
const kenplus = document.getElementById("ken+");
const kenminus = document.getElementById("ken-");

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const authStatus = document.getElementById("authStatus");

const counterButtons = [shoplus, shominus, kenplus, kenminus];

counterButtons.forEach(button => {
  button.disabled = true;
});

onValue(count1Ref, snapshot => {
  number1.textContent = snapshot.val() ?? 0;
});

onValue(count2Ref, snapshot => {
  number2.textContent = snapshot.val() ?? 0;
});


loginBtn.addEventListener("click", async () => {
  authStatus.textContent = "Signing in...";

  try {
    const credential = await signInWithEmailAndPassword(
      auth,
      emailInput.value.trim(),
      passwordInput.value
    );

    authStatus.textContent = "You are good";
    console.log("Signed in UID:", credential.user.uid);
  } catch (error) {
    console.error("Firebase sign-in error:", error.code, error.message);

    authStatus.textContent = `Nice try failya: ${error.code}`;
  }
});

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
});

onAuthStateChanged(auth, user => {
  const isOwner = user !== null && user.uid === OWNER_UID;

  counterButtons.forEach(button => {
    button.disabled = !isOwner;
  });

  loginBtn.hidden = isOwner;
  logoutBtn.hidden = !isOwner;
  emailInput.hidden = isOwner;
  passwordInput.hidden = isOwner;

  authStatus.textContent = isOwner
    ? "You are good"
    : "You are failya";
});

function changeCounter(counterRef, amount) {
  if (auth.currentUser?.uid !== OWNER_UID) return;

  runTransaction(counterRef, current => {
    return (current ?? 0) + amount;
  }).catch(error => {
    console.error("Nice try failya:", error);
  });
}

shoplus.addEventListener("click", () => {
  changeCounter(count1Ref, 1);
});

shominus.addEventListener("click", () => {
  changeCounter(count1Ref, -1);
});

kenplus.addEventListener("click", () => {
  changeCounter(count2Ref, 1);
});

kenminus.addEventListener("click", () => {
  changeCounter(count2Ref, -1);
});