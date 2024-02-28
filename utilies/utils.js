import { Linking } from "react-native";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { firebaseStorage } from "../lib/firebase";

export const openLink = (url) => {
    Linking.openURL(url);
};

export const firebaseUploadFile = (uri) => {
    const filesExtension = uri.split(".").pop();
    const filesName = `${Date.now()}.${filesExtension}`;

    return new Promise(async (resolve, reject) => {
        const storage = firebaseStorage()

        try {
            const storageRef = ref(
                storage,
                `kyc/${filesName}`
            );

            const file = await getBlob(uri);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on("state_changed",
                async (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    console.log(progress);
                },
                (error) => { alert(error); },
                async () => {
                    await getDownloadURL(uploadTask.snapshot.ref)
                        .then(async (url) => {
                            resolve(url)
                        });
                }
            );
        } catch (error) {
            reject(error);
            console.error("upload error....", error);
        }
    });
}

export const getBlob = async (uri) => {
    return await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            resolve(xhr.response);
        };
        xhr.onerror = (error) => console.log("error", error);
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });
};
