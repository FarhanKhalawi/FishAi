import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { useContext, useState } from "react";
import { Formik } from "formik";


import Background_2 from "../../assets/Background_2.png";
import { colors, dimensions, editProfileValidationSchema } from "../config";
import { UserContext } from "../logic/context";
import routes from "../config/routes";

import { CustomUseEffect } from "../logic";
import { handlePictureUpload, updateUserInfo } from "../firebase";

import CustomScreenWithNavigationHeader from "../components/CustomScreenWithNavigationHeader";
import CustomProfilePicture from "../components/CustomProfilePicture";
import CustomTextInput from "../components/CustomTextInput";
import CustomDatePicker from "../components/CustomDatePicker";
import CustomTransparentButton from "../components/CustomTransparentButton";


const EditProfileScreen = ({ navigation }) => {
    /* ********************************************************************************************** */
    /*                                             STATES                                             */
    /* ********************************************************************************************** */
    const [image, setImage] = useState(null); // state to the selected image uri.
    const { userData, setUserData } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    //------------------------------------------------------------------------------------------------//


    /* ********************************************************************************************** */
    /*                                        Buttons callbacks                                       */
    /* ********************************************************************************************** */
    const handleEditPicturePressed = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    const handleSavePressed = async (values) => {
        setIsLoading(true);
        const imageUri = await handlePictureUpload(image);
        await updateUserInfo(values, imageUri, userData, setUserData).then(() => setIsLoading(false));
        navigation.navigate(routes.PROFILE_SCREEN);
    }
    //------------------------------------------------------------------------------------------------//
    /* ********************************************************************************************** */
    /*                                            Callbacks                                           */
    /* ********************************************************************************************** */

    //------------------------------------------------------------------------------------------------//


    /* ********************************************************************************************** */
    /*                                           useEffect                                            */
    /* ********************************************************************************************** */

    /* Does nothing */
    CustomUseEffect(() => {

    }, []);
    //------------------------------------------------------------------------------------------------//


    return (
        <CustomScreenWithNavigationHeader style={ styles.container }
                                          contentContainerStyle={ styles.container }
                                          backgroundImage={ Background_2 }
                                          optionShown={ false }
                                          backOnPress={ () => navigation.goBack() }
                                          title={ "Edit profile" }

        >
            {/* Blue card - Body section */ }
            <View style={ styles.blueContainer }>

                <Formik initialValues={ {
                    nickname: userData.nickname,
                    phoneNumber: userData.phoneNumber,
                    DOB: userData.DOB
                } }
                        onSubmit={ handleSavePressed }
                        validationSchema={ editProfileValidationSchema }
                >
                    { ({ handleChange, handleSubmit, setFieldValue, errors, setFieldTouched, touched }) => (
                        <>
                            <ScrollView contentContainerStyle={ styles.ScrollBlueContainer } scrollEventThrottle={ 16 }>
                                <CustomTextInput
                                    style={ styles.inputFields }
                                    title={ "Nickname:" }
                                    placeholder={ userData.nickname }
                                    onChange={ handleChange("nickname") }
                                    onBlur={ () => setFieldTouched("nickname") }
                                    visible={ touched.nickname }
                                    errorMessage={ errors.nickname }
                                />
                                <CustomTextInput
                                    style={ styles.inputFields }
                                    title={ "Phone number:" }
                                    placeholder={ userData.phoneNumber }
                                    onChange={ handleChange("phoneNumber") }
                                    keyboardType={ "numeric" }
                                    onBlur={ () => setFieldTouched("phoneNumber") }
                                    visible={ touched.phoneNumber }
                                    errorMessage={ errors.phoneNumber }
                                />
                                <CustomDatePicker style={ styles.inputFields }
                                                  onChange={ (dateString) => setFieldValue("DOB", dateString) }
                                                  errorMessage={ errors.DOB }
                                                  onBlur={ () => setFieldTouched("DOB") }
                                                  visible={ touched.DOB }
                                                  dateOfBirth={ userData.DOB }
                                />

                                <Text style={{paddingTop: "20%", color: colors.RedText, fontWeight: "bold", letterSpacing: 1, fontSize: Math.min( 18 * dimensions.scale, 22 )}} testID={"removeAccount"} onPress={()=> Linking.openURL("https://privacy.fish-ai.no/deletion_request")}>Remove My Account</Text>
                            </ScrollView>
                            <CustomTransparentButton isLoading={ isLoading } title={ "SAVE" } onPress={ handleSubmit }/>
                        </>
                    ) }
                </Formik>
            </View>

            {/* profile picture container */ }
            <View style={ styles.profilePictureContainer }>
                <CustomProfilePicture size={ Math.min(200 * dimensions.scale, 300) }
                                      uri={ image ? image : userData.profilePicUri }
                                      editIconShown={ true } editOnPress={ handleEditPicturePressed } Angle={ 330 }
                />
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

    profilePictureContainer: {
        position: "absolute",
        bottom: (dimensions.windowHeight * 0.75) - ((Math.min(200 * dimensions.scale, 300)) / 2),
    },

    blueContainer: {
        width: dimensions.windowWidth - 8,
        height: dimensions.windowHeight * 0.75,
        backgroundColor: colors.primaryBlue,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: Math.min(100 * dimensions.scale, 150),
        paddingBottom: 25,

    },
    ScrollBlueContainer: {
        width: dimensions.windowWidth - 8,
        alignItems: "center",
    },
    inputFields: {
        marginVertical: Math.min(17 * dimensions.scale, 20),
    },

});

export default EditProfileScreen;