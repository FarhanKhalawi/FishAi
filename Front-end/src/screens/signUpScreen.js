import {ScrollView, StyleSheet, View, Image, Text,} from 'react-native';
import {Formik} from "formik";

import Background_2 from "../../assets/Background_2.png";
import {colors, dimensions,} from "../config";
import {signUpValidationSchema} from '../config/validationSchema';
import routes from '../config/routes';

import CustomScreenWithNavigationHeader from "../components/CustomScreenWithNavigationHeader";
import CustomTextInput from "../components/CustomTextInput";
import CustomTransparentButton from "../components/CustomTransparentButton";


const SignUpScreen = ({navigation}) => {
    const handleSignUpPressed = (values) => {
        navigation.navigate(routes.PRIVACY_POLICY_SCREEN, values);
    }
    const handleSignInPressed = () => {
        navigation.navigate(routes.SIGN_IN_SCREEN);
    }


    return (
        <CustomScreenWithNavigationHeader style={styles.container}
                                          contentContainerStyle={styles.container}
                                          backgroundImage={Background_2}
                                          titleShown={false}
                                          optionShown={false}
                                          backOnPress={() => navigation.popToTop()}
        >
            <Image style={styles.logo} source={require("../../assets/logo_2.png")}/>

            <View style={styles.blueContainer}>

                <Text style={styles.Text}>SIGN UP NEW USER</Text>

                <Formik initialValues={{nickname: '', phoneNumber: '', email: '', password: '', confirmPassword: ''}}
                        onSubmit={handleSignUpPressed}
                        validationSchema={signUpValidationSchema}
                >
                    {({handleChange, handleSubmit, errors, setFieldTouched, setFieldValue, touched}) => (
                        <>
                            <ScrollView contentContainerStyle={styles.ScrollBlueContainer} scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
                                <CustomTextInput
                                    testID={"nickname_input_text"}
                                    style={styles.inputFields}
                                    title={"Nickname:"}
                                    placeholder={"nickname"}
                                    onChange={handleChange("nickname")}
                                    onBlur={() => setFieldTouched("nickname")}
                                    visible={touched.nickname}
                                    errorMessage={errors.nickname}
                                />
                                <CustomTextInput
                                    testID={"phone_input_text"}
                                    style={styles.inputFields}
                                    title={"Phone Number:"}
                                    placeholder={"phone number"}
                                    onChange={handleChange("phoneNumber")}
                                    keyboardType={"numeric"}
                                    onBlur={() => setFieldTouched("phoneNumber")}
                                    visible={touched.phoneNumber}
                                    errorMessage={errors.phoneNumber}
                                />
                                <CustomTextInput
                                    testID={"email_input_text"}
                                    style={styles.inputFields}
                                    title={"Email"}
                                    placeholder={"Email@example.com"}
                                    onChange={handleChange("email")}
                                    keyboardType={"email-address"}
                                    onBlur={() => setFieldTouched("email")}
                                    visible={touched.email}
                                    errorMessage={errors.email}
                                />
                                <CustomTextInput
                                    testID={"password_input_text"}
                                    style={styles.inputFields}
                                    title={"Password:"}
                                    placeholder={"Password"}
                                    onChange={handleChange("password")}
                                    secureTextEntry={true}
                                    onBlur={() => setFieldTouched("password")}
                                    visible={touched.password}
                                    errorMessage={errors.password}
                                />
                                <CustomTextInput
                                    testID={"con_password_input_text"}
                                    style={styles.inputFields}
                                    title={"Confirm Password:"}
                                    placeholder={"Confirm Password"}
                                    secureTextEntry={true}
                                    onChange={handleChange("confirmPassword")}
                                    onBlur={() => setFieldTouched("confirmPassword")}
                                    visible={touched.confirmPassword}
                                    errorMessage={errors.confirmPassword}
                                />
                            </ScrollView>
                            <CustomTransparentButton style={styles.button} title={"SIGN UP"}
                                                     onPress={handleSubmit}/>
                            <Text style={styles.Text1}>Already have an account? <Text
                                style={styles.textButton_2} onPress={handleSignInPressed}>Sign
                                In</Text></Text>
                        </>

                    )}
                </Formik>
            </View>

        </CustomScreenWithNavigationHeader>

    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    button: {},
    Text: {
        textAlign: "center",
        color: 'white',
        fontSize: Math.min(32 * dimensions.scale, 38),
        fontWeight: "bold",
    },
    Text1: {
        padding: 10,
        color: 'white',
        fontSize: Math.min(12 * dimensions.scale, 18),
    },

    blueContainer: {
        width: dimensions.windowWidth - 8,
        height: dimensions.windowHeight * 0.70,
        backgroundColor: colors.primaryBlue,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: Math.min(20 * dimensions.scale, 150),
        paddingBottom: 25,
    },
    ScrollBlueContainer: {
        width: dimensions.windowWidth - 10,
        alignItems: "center",
        paddingBottom: "25%",
    },
    inputFields: {
        marginVertical: Math.min(17 * dimensions.scale, 20),
    },
    logo: {
        position: "absolute",
        width: 230,
        height: 90,
        top: 40,
    },
    textButton_2: {
        fontWeight: "bold",
        textDecorationLine: "underline",
    },

});

export default SignUpScreen;