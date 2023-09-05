import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCyqCuMjAAj5luWbbGIXkMBSvv_NV4X008",
  authDomain: "todolist-redux-toolkit-db3f2.firebaseapp.com",
  projectId: "todolist-redux-toolkit-db3f2",
  storageBucket: "todolist-redux-toolkit-db3f2.appspot.com",
  messagingSenderId: "993812827762",
  appId: "1:993812827762:web:b0d7bc4da8d2a64e83fceb",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
