import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, query, where, collection, addDoc, deleteDoc, getDocs, doc, setDoc, getDoc, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";


const firebaseConfig = {
  apiKey: "AIzaSyDwwe83c3riimwHIZA-tP_qWo0txxxVuwM",
  authDomain: "blogging-app-13e6c.firebaseapp.com",
  projectId: "blogging-app-13e6c",
  storageBucket: "blogging-app-13e6c.appspot.com",
  messagingSenderId: "994881217745",
  appId: "1:994881217745:web:6f96c0fc021f73ec6311f0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

const blogRef = collection(db, "blogs");
const userRef = collection(db, "users");
const storage = getStorage(app);

export {
  app,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  db,
  addDoc,
  ref,
  uploadBytes,
  storage,
  getDownloadURL,
  doc,
  setDoc,
  getDoc,
  collection,
  onSnapshot,
  getDocs,
  updateDoc,
  onAuthStateChanged,
  signOut,
  query,
  where,
  userRef,
  deleteDoc,
  blogRef
}