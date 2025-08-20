import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from "react";
import { colors, dimensions } from "../config";

/**
 * A custom text input component that displays a title, allows the user to input text and displays an error message if applicable
 * @param {object} props - The props object
 * @param {object} props.style - Style object to override the default styles
 * @param {string} props.title - The title to be displayed above the text input
 * @param {string} props.placeholder - The placeholder text to be displayed in the text input
 * @param {function} props.onChange - Function to be called when the text input is changed, receives the input value as an argument
 * @param {string|null} props.errorMessage - Error message to be displayed below the text input
 * @param {string} props.keyboardType - Specifies the keyboard type to be used on the text input (default: 'default')
 * @param {function} props.onBlur - Function to be called when the user stops editing the text input
 * @param {boolean} props.visible - Indicates if the error message should be displayed
 * @param {string} props.testID - Test id
 * @returns {JSX.Element} - The text input component
 */
const CustomTextInput = ({style, title, placeholder, onChange, errorMessage = null, keyboardType, onBlur, visible, secureTextEntry, testID}) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>{title}</Text>
            </View>
            <View style={styles.bodyContainer}>
                <View style={styles.bodyTextContainer}>
                    <TextInput style={styles.bodyText}
                               testID={testID}
                               returnKeyType="done"
                               placeholder={placeholder}
                               onChangeText={onChange}
                               onBlur={onBlur}
                               keyboardType={keyboardType ? keyboardType : 'default'}
                               secureTextEntry={secureTextEntry}
                               clearButtonMode={"while-editing"}
                    ></TextInput>
                </View>
            </View>

            {/* Error message */}
            {(errorMessage && visible) &&
                <View style={styles.errorTextContainer}>
                    <Text style={styles.errorText}>{errorMessage}</Text>
                </View>
            }
        </View>
    );
};


const styles = StyleSheet.create( {
    container : {
        width : "100%",
        height : Math.min( 60 * dimensions.scale, 80 ),
        alignItems : 'center',
        justifyContent : 'space-between',
        paddingHorizontal : 10,
    },
    headerContainer : {
        width : "100%",
        marginBottom : 4,
    },
    headerText : {
        color : colors.white,
        fontSize : Math.min( 16 * dimensions.scale, 22 ),
        letterSpacing : 1,
    },
    bodyContainer : {
        width : "100%",
        flex : 1,
        flexDirection : "row",
        alignItems : "center",
    },
    bodyTextContainer : {
        flex : 1,
        height : "100%",
    },
    bodyText : {
        // height : "100%",
        color : colors.black,
        fontSize : Math.min( 16 * dimensions.scale, 20 ),
        borderBottomWidth : 1,
        borderBottomColor : colors.white,
    },
    errorTextContainer : {
        width : "100%",
        justifyContent : "flex-start",
    },
    errorText : {
        color : colors.RedText,
        fontSize : Math.min( 12 * dimensions.scale, 16 ),
    },
} );

export default CustomTextInput;