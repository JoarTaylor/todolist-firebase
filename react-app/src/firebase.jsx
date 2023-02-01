// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACNZxTVm5wDle2t91sOMCJdTZinL-yuIE",
  authDomain: "todolist-firebase-65525.firebaseapp.com",
  projectId: "todolist-firebase-65525",
  storageBucket: "todolist-firebase-65525.appspot.com",
  messagingSenderId: "734615195081",
  appId: "1:734615195081:web:239547bbc59c2a5583ac18"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

export const usersCollectionRef = collection(db, "tasks");

/*Obs! Här används colletion "task" - se till att du skapar en ny collection med 
* samma namn Firebase console -> Build -> Firestore Database -> Start collection
*/

/**
 * Sparar en ny uppgift i Firestore
 * @param {string} title uppgiftens titel
 * @param {string} description beskrivning av uppgift
 */
export const saveTask = (title, description, completed) =>
  addDoc(collection(db, "tasks"), { title, description, completed });
  

// Lyssnar på förändringar och uppdaterar dem i collection
export const onGetTasks = (callback) =>
  onSnapshot(collection(db, "tasks"), callback);

/**
 * Tar bort en ny uppgift 
 * @param {string} id uppgiftens id
 */
export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

/**
 * Hämtar en ny uppgift
 * @param {string} uppgiftens id
 */
export const getTask = (id) => getDoc(doc(db, "tasks", id));

/**
 * Uppdaterar en ny uppgift
 * @param {string} id uppgiftens id
 * @param {string} newFields uppdaterad data
 */
export const updateTask = (id, newFields) =>
  updateDoc(doc(db, "tasks", id), newFields);


/**
 * Hämtar alla uppgifter
 */
export const getTasks = () => getDocs(collection(db, "tasks"));