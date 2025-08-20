import {ScrollView, StyleSheet, View, Image, Text,} from 'react-native';
import {Formik} from "formik";

import Background_2 from "../../assets/Background_2.png";
import {colors, dimensions,} from "../config";
import {forgotPasswordValidationSchema} from '../config/validationSchema';

import CustomScreenWithNavigationHeader from "../components/CustomScreenWithNavigationHeader";
import CustomTextInput from "../components/CustomTextInput";
import CustomTransparentButton from "../components/CustomTransparentButton";
import { resetPassword } from "../firebase";


const ForgotPassword = ({navigation}) => {


    const handleSendButton = async (values) => {
        await resetPassword(values.email);
        navigation.popToTop()
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

                <Text style={styles.Text}>GET A NEW PASSWORD</Text>

                <Formik initialValues={{email: ''}}
                        onSubmit={handleSendButton}
                        validationSchema={forgotPasswordValidationSchema}
                >
                    {({handleChange, handleSubmit, errors, setFieldTouched, touched}) => (
                        <>
                            <ScrollView contentContainerStyle={styles.ScrollBlueContainer} scrollEventThrottle={16}>

                                <Text style={styles.Text1}>Enter your registered email below to receive password reset
                                    instruction
                                </Text>
                                <CustomTextInput
                                    testID={"email_input_text"}
                                    style={styles.inputFields}
                                    title={"Email"}
                                    values={"email"}
                                    placeholder={"Email@example.com"}
                                    onChange={handleChange("email")}
                                    onBlur={() => setFieldTouched("email")}
                                    visible={touched.email}
                                    errorMessage={errors.email}
                                    keyboardType={"email-address"}
                                />

                            </ScrollView>
                            <CustomTransparentButton style={styles.button} title={"SEND"} onPress={handleSubmit}/>
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
    Text: {
        textAlign: "center",
        color: 'white',
        fontSize: Math.min(32 * dimensions.scale, 38),
        fontWeight: "bold",
    },
    Text1: {
        paddingTop: Math.min(40 * dimensions.scale, 50),
        textAlign: "left",
        color: 'white',
        fontSize: Math.min(16 * dimensions.scale, 22),
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
    },
    inputFields: {
        marginVertical: Math.min(17 * dimensions.scale, 20),

    },
    logo: {
        position: "absolute",
        width: 230,
        height: 90,
        top: 40,
    }

});

export default ForgotPassword;