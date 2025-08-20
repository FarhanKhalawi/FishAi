import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth"
import { auth } from "./firebaseConfig"
import Constants from "expo-constants";
import { _createUserProfile } from "./firebaseApis";

WebBrowser.maybeCompleteAuthSession();


export default function useGoogleAuth() {
    const [token, setToken] = useState("");
    const {expoClientId, iosClientId, androidClientId} = Constants.expoConfig.extra.googleAuth;

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: expoClientId,
        androidClientId: androidClientId,
        iosClientId: iosClientId,
    });

    useEffect(() => {
        if (response?.type === "success") {
            setToken(response.authentication.accessToken);
        }
    }, [response, token]);


    const createUserProfileWithGoogle = async (newUserInfo, uid) => {
        await _createUserProfile(newUserInfo, uid);
    };

    useEffect(() => {
        if (token !== "") {
            const credential = GoogleAuthProvider.credential(null, token);
            // Sign in with credential from the Google user.
            signInWithCredential(auth, credential).then((userCredential) => {
                // Check if the user is created
                if (userCredential.user) {
                    const newUserInfo = {
                        nickname: userCredential.user.displayName,
                        email: userCredential.user.email,
                        phoneNumber: userCredential.user.phoneNumber,
                        profilePicUri: userCredential.user.photoURL,
                    }
                    createUserProfileWithGoogle(newUserInfo, userCredential.user.uid).then(null);
                }
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The credential that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });

        }
    }, [token]);

    return { request, promptAsync };
}
