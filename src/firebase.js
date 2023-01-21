import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAO96ako7kxTP3bIgLXbWP17yEkXe0p2QM",
    authDomain: "social-media-application-5b026.firebaseapp.com",
    projectId: "social-media-application-5b026",
    storageBucket: "social-media-application-5b026.appspot.com",
    messagingSenderId: "979306323267",
    appId: "1:979306323267:web:62ac09a973ad68a7daa3f6"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);