import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const api_key = process.env.REACT_APP_APIKEY; 
const auth_domain = process.env.REACT_APP_AUTHDOMAIN; 
const project_id = process.env.REACT_APP_PROJECTID; 
const storage_bucket = process.env.REACT_APP_STORAGEBUCKET; 
const messaging_sender_id = process.env.REACT_APP_MESSAGINGSENDERID; 
const app_id = process.env.REACT_APP_APPID; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: api_key,
  authDomain: auth_domain,
  projectId: project_id,
  storageBucket: storage_bucket,
  messagingSenderId: messaging_sender_id,
  appId: app_id
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);