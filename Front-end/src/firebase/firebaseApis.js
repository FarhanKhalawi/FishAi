import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { auth, db, storage } from "./firebaseConfig"
import { Alert } from "react-native";


/** SignIn with email and password */
export const signInEmailAndPassword = async (email, password, setUserData) => {

    try {
        await signInWithEmailAndPassword(auth, email, password);
        await _getUserInfo(setUserData);
    } catch (error) {
        const errorCode = error.code;
        if (errorCode === "auth/user-not-found") {
            Alert.alert('wrong email!', "Uh-oh! Our fishing nets didn't catch any account associated with that email. Please make sure you've entered it correctly, or swim on over to sign up for a new account");
        } else if (errorCode === "auth/wrong-password") {
            Alert.alert('wrong password!', "Looks like you're fishing with the wrong bait! Please check your password and try again, or you might be left without a catch");
        } else {
            Alert.alert('Error!', error.message);
        }
    }
};


/** SignUp with email and password */
export const signUpWithEmailAndPassword = async (newUserInfo) => {
    await createUserWithEmailAndPassword(auth, newUserInfo.email, newUserInfo.password)
        .then(async userCredential => {
            await _sendEmailVerification();
            await _createUserProfile(newUserInfo, userCredential.user.uid)
            await signOut(auth);
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === "auth/email-already-in-use") {
                Alert.alert('Error!', "Oh snap, looks like you're using bait that's already been nibbled on! It seems there's already an account associated with that email. If you've forgotten your password, you can reset it by using our \"forgot password\" feature. Otherwise, if you're trying to create a new account, please use a different email address to reel in your own catch.");
            }  else {
                Alert.alert('Error!', error.message);
            }
        })
}

/** sign out */
export const toggleSignOut = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
    });
}

/** Reset password*/
export const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
        .then(() => {
            Alert.alert('succeeded!', "We've just sent a message in a bottle with instructions on how to reset your password. Keep an eye on your inbox (and your fishing net) for the email!");
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === "auth/user-not-found") {
                Alert.alert('Error!', "Uh-oh, looks like our fishing nets came up empty! We couldn't find any account swimming around with that email. Take another dive and make sure you're using the correct email address.");
            } else {
                Alert.alert('Error!', `Error: ${ error.code } ${ error.message }`);
            }
        });
};


/** send email verification using firebase */
const _sendEmailVerification = async () => {
    await sendEmailVerification(auth.currentUser)
        .then(() => {
            Alert.alert('succeeded!', 'Your email verification is swimming its way to your inbox! Confirm it and you\'ll be hooked up with the latest fishing tech, navigating the waters like a pro with the power of AI!');
        })
        .catch((error) => {
            Alert.alert('Error! email', `Error: ${ error.code } ${ error.message }`);
        })
}

/** create user profile */
export const _createUserProfile = async (newUserInfo, uid) => {
    try {
        const docRef = doc(collection(db, 'users'), uid);
        const docSnapshot = await getDoc(docRef);

        if (!docSnapshot.exists()) {
            const now = new Date();
            const formattedDate = now.toISOString().slice(0, 10); // Get the first 10 characters of the ISO string
            await setDoc(doc(db, "users", uid), {
                nickname: newUserInfo.nickname,
                email: newUserInfo.email,
                phoneNumber: newUserInfo.phoneNumber,
                DOB: null,
                profilePicUri: newUserInfo?.profilePicUri ?? null,
                registeredDate: formattedDate
            });
        }
    } catch (e) {
        console.error('Error creating new account:', e);
    }
}

/** get user info */
export const _getUserInfo = async (setUserData) => {
    try {
        const docRef = doc(collection(db, 'users'), auth.currentUser.uid);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            setUserData(docSnapshot.data());
        } else {
            console.log('No such document!');
        }
    } catch (e) {
        console.error('Error getting document:', e);
    }
}

/** upload profile picture */
export const handlePictureUpload = async (image) => {
    if (image) {
        const response = await fetch(image);
        const blob = await response.blob();
        const fileName = auth.currentUser.uid;

        // create child reference:
        const storageRef = ref(storage, "profilePictures");
        const imageRef = ref(storageRef, fileName);

        const uploadTask = uploadBytesResumable(imageRef, blob);

        return new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Show progress during the upload
                    // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    // console.log('Upload is ' + progress.toFixed(2) + '% done');
                },
                (error) => {
                    // Handle unsuccessful uploads
                    console.error('Upload failed:', error);
                    reject(error);
                },
                async () => {
                    // Upload completed successfully, now we can get the download URL
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(downloadURL);
                }
            );
        });
    } else {
        return null;
    }
};


/** update user info  */
export const updateUserInfo = async (existingUserInfo, imageUri, userData, setUserData) => {
    const uid = auth.currentUser.uid;

    // update only the changes
    const updatedData = {};
    const propertiesToCheck = ["DOB", "nickname", "phoneNumber"];
    propertiesToCheck.forEach((prop) => {
        if (userData[prop] !== existingUserInfo[prop]) {
            updatedData[prop] = existingUserInfo[prop];
        }
    });
    if (imageUri !== null && imageUri !== existingUserInfo["profilePicUri"]) {
        updatedData["profilePicUri"] = imageUri;
    }

    await updateDoc(doc(db, "users", uid), updatedData);
    await _getUserInfo(setUserData);
}

/** save a route to history */
export const saveToHistory = async (fromPosition, toPosition) => {
    const uid = auth.currentUser.uid;
    const now = new Date();
    const day = now.toISOString().slice(8, 10);
    const date = now.toISOString().slice(0, 7);
    await addDoc(collection(db, "history"), {
        uid: uid,
        day: day,
        date: date,
        from: `Latitude: ${ fromPosition.coords.latitude }, Longitude: ${ fromPosition.coords.longitude }`,
        to: `Latitude: ${ toPosition.latitude }, Longitude: ${ toPosition.longitude }`,
        fishWeight: "",
    });
    await getHistory();
};

export const getHistory = async () => {
    const uid = auth.currentUser.uid;
    const q = query(collection(db, "history"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const setFishWeight = async (id, fishWeight) => {
    await updateDoc(doc(db, "history", id), { fishWeight: fishWeight });
}