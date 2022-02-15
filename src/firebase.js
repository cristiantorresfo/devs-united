import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDUjPcQs9_23X6FKSNfZE_qoyxHx1MUuxU",
  authDomain: "devs-united-project.firebaseapp.com",
  projectId: "devs-united-project",
  storageBucket: "devs-united-project.appspot.com",
  messagingSenderId: "595824901895",
  appId: "1:595824901895:web:35cfb91b1ea45453ac4fa2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

//Authentication
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const logInWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);

/**
 * Adds a new post to the collection posts
 * @param {string} post new post to be added to the collection
 */
export async function addPost(post) {
  try {
    await addDoc(collection(db, "posts"), post);
  } catch (e) {
    console.error("Error adding document: ", e);
    //throw new Error("Error en addUser");
  }
}

/**
 * Deletes a post by its id
 * @param {string} id Post Id to delete
 * @returns deleted post id
 */
export async function deletePost(id) {
  try {
    await deleteDoc(doc(db, "posts", id));
    return id;
  } catch (e) {
    console.log("Error al borrar el post", e);
  }
}

/**
 * Updates a post by its id
 * @param {string} id Post Id to update
 * @param {object} newData
 */
export async function updatePost(id, newData) {
  const userRef = doc(db, "posts", id);

  try {
    await updateDoc(userRef, newData);
  } catch (e) {
    console.log("Error al actualizar el post", e);
  }
}

export async function addUser(user) {
  try {
    await addDoc(collection(db, "users"), user);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function updateUser(id, newData) {
  const userRef = doc(db, "users", id);

  try {
    await updateDoc(userRef, newData);
  } catch (e) {
    console.log("Error al actualizar el user", e);
  }
}
