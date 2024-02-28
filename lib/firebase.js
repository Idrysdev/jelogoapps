import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const PROJECT_ID = "messaging-f9aa7";

export const firebaseStorage = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyBXeynyIgGI5FQa_z1rrg6HGZPW1jpxlos",
        authDomain: "messaging-f9aa7.firebaseapp.com",
        projectId: "messaging-f9aa7",
        storageBucket: "messaging-f9aa7.appspot.com",
        messagingSenderId: "563115900658",
        appId: "1:563115900658:web:ba172f401dab795ae55a6b",
        measurementId: "G-5NSSNQPHH4",

        databaseURL: `https://${PROJECT_ID}.firebaseio.com`,
    };

    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);

    return storage
}
