import { ImageBackground, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { useCallback, useContext, useState } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Formik } from "formik";

import Background_1 from "../../assets/Background_1.png"
import Logo_1 from "../../assets/logo_1.png"
import socialsLogos from "../../assets/socialsLogos.png"
import { colors, dimensions } from "../config";
import { signInValidationSchema } from "../config/validationSchema";
import routes from '../config/routes';
import { UserContext } from "../logic/context";
import useGoogleAuth from "../firebase/googleAuth";

import CustomGoogleButton from "../components/CustomGoogleButton";
import CustomTextInput from "../components/CustomTextInput";
import CustomTransparentButton from "../components/CustomTransparentButton";
import { signInEmailAndPassword } from "../firebase";

const SignInScreen = ({ navigation }) => {
    /* ********************************************************************************************** */
    /*                                             STATES                                             */
    /* ********************************************************************************************** */
    const { setUserData } = useContext(UserContext)
    const { request, promptAsync, userInfo } = useGoogleAuth();
    const [isSending, setIsSending] = useState(false);

    //------------------------------------------------------------------------------------------------//


    /* ********************************************************************************************** */
    /*                                           REFERENCES                                           */
    /* ********************************************************************************************** */
    const opacity = useSharedValue(0);

    //------------------------------------------------------------------------------------------------//


    /* ********************************************************************************************** */
    /*                                        Buttons callbacks                                       */
    /* ********************************************************************************************** */

    const handleSignInWithGooglePressed = () => {
        promptAsync()
    }

    const handleEmailPressed = useCallback(() => {
        opacity.value = withTiming(1, { duration: 1500 });
    }, []);

    const handleForgotPasswordPressed = () => {
        navigation.navigate(routes.FORGOT_PASSWORD_SCREEN);

    }

    const handleSignInPressed = async (values) => {
        setIsSending(true);
        await signInEmailAndPassword(values.email, values.password, setUserData);
        setIsSending(false);
    }

    const handleSignUpPressed = () => {
        navigation.navigate(routes.SIGN_UP_STACK);

    }
    //------------------------------------------------------------------------------------------------//


    /* ********************************************************************************************** */
    /*                                            Callbacks                                           */
    /* ********************************************************************************************** */
    const fadeIn = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    //------------------------------------------------------------------------------------------------//


    /* ********************************************************************************************** */
    /*                                           useEffect                                            */
    /* ********************************************************************************************** */

    //------------------------------------------------------------------------------------------------//
    /*
    *
    *
    * need to add padding to scroll view
    *
    * */
    return (<ImageBackground source={ Background_1 } style={ styles.container }>
        <Image source={ Logo_1 } style={ styles.logo }/>
        <CustomGoogleButton title={ "Continue with Google" } onPress={ handleSignInWithGooglePressed }/>
        <Text style={ [styles.textButton_1, { marginVertical: 0 }] }>or use <Text testID="use_email"
                                                                                  style={ styles.textButton_2 }
                                                                                  onPress={ handleEmailPressed }>E-mail</Text></Text>

        <Animated.View style={ [styles.fieldsContainer, fadeIn] }>


            <Formik initialValues={ { email: '', password: '' } }
                    onSubmit={ handleSignInPressed }
                    validationSchema={ signInValidationSchema }
            >
                { ({ handleChange, handleSubmit, setFieldValue, errors, setFieldTouched, touched }) => (<>
                    <ScrollView contentContainerStyle={ styles.ScrollViewContainer } scrollEventThrottle={ 16 } showsVerticalScrollIndicator={false}>
                        <CustomTextInput
                            testID={ "email_input_text" }
                            style={ styles.inputFields }
                            title={ "E-mail:" }
                            placeholder={ "email@example.com" }
                            onChange={ handleChange("email") }
                            onBlur={ () => setFieldTouched("email") }
                            visible={ touched.email }
                            errorMessage={ errors.email }
                            keyboardType={ "email-address" }
                        />
                        <CustomTextInput
                            testID={ "password_input_text" }
                            style={ styles.inputFields }
                            title={ "Password:" }
                            placeholder={ "Password" }
                            onChange={ handleChange("password") }
                            secureTextEntry={ true }
                            onBlur={ () => setFieldTouched("password") }
                            visible={ touched.password }
                            errorMessage={ errors.password }
                        />
                        <Text style={ styles.textButton_1 }>Forgot <Text style={ styles.textButton_2 }
                                                                         onPress={ handleForgotPasswordPressed }
                        >Password?</Text></Text>

                        <CustomTransparentButton isLoading={ isSending } title={ "SIGN IN" } onPress={ handleSubmit }/>

                        <Text style={ styles.textButton_1 }>New user? <Text testID={ "sign_up" }
                                                                            style={ styles.textButton_2 }
                                                                            onPress={ handleSignUpPressed }>Signup?</Text></Text>

                    </ScrollView>
                </>) }
            </Formik>

        </Animated.View>
        <Image source={ socialsLogos } style={ styles.logos }/>
    </ImageBackground>);
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: Math.min(dimensions.windowHeight * 0.38, dimensions.windowHeight * 0.38 * dimensions.scale),
    }, logo: {
        position: "absolute", width: 230, height: 90,

        top: Math.min(130 * dimensions.scale, 130), // center the logo in the middle of the screen
        left: (dimensions.windowWidth / 2) - (230 / 2), // 230 is the width of the logo.
    }, textButton_1: {
        color: colors.white, fontSize: Math.min(14 * dimensions.scale, 16), letterSpacing: 1, marginVertical: 20,
    }, textButton_2: {
        fontWeight: "bold", textDecorationLine: "underline",
    }, fieldsContainer: {
        width: dimensions.windowWidth - 30, flex: 1, alignItems: "center",
    }, inputFields: {
        marginVertical: Math.min(17 * dimensions.scale, 20),
    }, logos: {
        width: 156, height: 32, marginBottom: 20,
    }, ScrollViewContainer: {
        width: dimensions.windowWidth - 30, alignItems: "center", paddingBottom: "25%",
    }

});

export default SignInScreen;