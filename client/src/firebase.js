import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; // Import Storage

const firebaseConfig = {
  apiKey: "AIzaSyBirKdahMmMt-HazrFj1dyAVRAuOMFVkck",
  authDomain: "blog-58f35.firebaseapp.com",
  projectId: "blog-58f35",
  storageBucket: "blog-58f35.appspot.com",
  messagingSenderId: "860267064085",
  appId: "1:860267064085:web:49f05cae9b6ef1adef171c",
  measurementId: "G-DQ3ZDX7MMV",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app); // Initialize Storage

export { storage };
