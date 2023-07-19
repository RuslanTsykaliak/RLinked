import { storage } from "../firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { editProfile } from "./FirestoreAPI";

// Function to upload user profile image to Firebase Storage
export const uploadImage = (
    file,
    id,
    setModalOpen,
    setProgress,
    setCurrentImage
) => {
    // Create a reference to the Firebase Storage location to store the profile image
    const profilePicsRef = ref(storage, `profileImages/${file.name}`);

    // Create an upload task to upload the image file to Firebase Storage
    const uploadTask = uploadBytesResumable(profilePicsRef, file);

    // Set up listeners to track the upload progress and handle upload completion
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = Math.round(
                (spanshot.bytesTransferred / snapshot.totalBytes) * 100
            );

            setProgress(progress);
        },
        (error) => {
            console.log(err);
        },
        () => {
            // When the upload is complete, get the download URL of the uploaded image
            getDownloadURL(uploadTask.snapshot.ref).then((response) => {
                editProfile(id, { imageLink: response});
                setModalOpen(false );
                setCurrentImage({});
                setProgress(0);
            });
        }
    );
};

// Function to upload post image to Firebase Storage
export const uploadPostImage = (file, setPostImage, setProgress) => {
    const postPicsRef = ref(storage,  `postImages/${file.name}`);
    const uploadTask = uploadBytesResumable(postPicsRef, file);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes)  * 100
            );

        setProgress(progress);
        },
        (error) => {
            console.log(err);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((response) => {
                // Set the post image URL in the component state
                setPostImage(response);
            });
        }
    );
};
