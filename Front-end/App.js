import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ImageBackground } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";

import { UserContext } from "./src/logic/context";

import HOME_STACK from "./src/Navigation/HomeStack";
import AUTH_STACK from "./src/Navigation/AuthStack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/firebase/firebaseConfig";
import { _getUserInfo, toggleSignOut } from "./src/firebase";


export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);
    const [user, setUser] = useState(false);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        // Set up the listener
        const unsubscribe = onAuthStateChanged(auth, (usr) => {
            if (usr) {
                if (usr.emailVerified) {
                    _getUserInfo(setUserData).then(null);
                    setUser(true);
                } else {
                    // Sign out the user if their email is not verified
                    toggleSignOut();
                    Alert.alert("Verification Required!", "We're almost there! Please verify your email address by clicking on the link we sent you, so we can set sail on your fishing journey");
                }
            } else {
                setUser(false);
            }
            setAppIsReady(true);
        });

        // Return a cleanup function to unsubscribe when the component is unmounted
        return () => {
            unsubscribe();
        };
    }, []);


    /* Display background image with activity indicator while waiting to check user cookies */
    if (!appIsReady) {
        return (
            <ImageBackground
                style={ { flex: 1, alignItems: "center", justifyContent: "center" } }
                source={ require("../Front-end/assets/splashScreen.png") }>
                <ActivityIndicator style={ { marginTop: 60 } } size="large" color={ "#00000090" }/>
            </ImageBackground>
        );
    } else {
        /* Conditionally render a stack based on user cookies */
        return (
            <UserContext.Provider value={ { userData, setUserData } }>
                <StatusBar style="dark"/>
                <NavigationContainer>
                    { user ? <HOME_STACK/> : <AUTH_STACK/> }
                </NavigationContainer>
            </UserContext.Provider>

        );
    }
}