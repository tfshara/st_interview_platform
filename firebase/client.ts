import { initializeApp ,getApp,getApps} from "firebase/app";
import { getAuth } from "firebase/auth";
import  {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyA23pz9kOpKh7QVLcvSKTaT4xNzrJCLgjI",
  authDomain: "aceprep-cf1a7.firebaseapp.com",
  projectId: "aceprep-cf1a7",
  storageBucket: "aceprep-cf1a7.firebasestorage.app",
  messagingSenderId: "746297266842",
  appId: "1:746297266842:web:3dbaa37ea981f39b454523",
  measurementId: "G-XFB1DV2X1F"
};


const app = !getApps.length ?initializeApp(firebaseConfig):getApp();
export const auth=getAuth(app)
export const db=getFirestore(app)