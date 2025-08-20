import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Entypo } from '@expo/vector-icons';
import { colors, dimensions } from "../config";

/**
 * A custom date picker component that displays a selected date and allows the user to select a new date
 * @param {object} props - The props object
 * @param {object} props.style - Style object to override the default styles
 * @param {function} props.onChange - Function to be called when the date is changed, receives the selected date as a string argument
 * @param {string} props.errorMessage - Error message to be displayed below the date picker
 * @param {function} props.onBlur - Function to be called on 'onPressOut' event of the component.
 * @param {boolean} props.visible - Indicates if the error message should be displayed
 * @returns {JSX.Element} - The date picker component
 */
const CustomDatePicker = ({style, onChange, errorMessage, onBlur, visible, dateOfBirth}) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState( false );
    const [selectedDate, setSelectedDate] = useState( null );

    // Define a function to show the date picker
    const showDatePicker = () => {
        setDatePickerVisibility( true );
    };

    // Define a function to hide the date picker
    const hideDatePicker = () => {
        setDatePickerVisibility( false );
    };

    // Define a function to handle the selected date
    const handleConfirm = (date) => {
        setSelectedDate( date );
        onChange( date.toLocaleDateString() );
        hideDatePicker();
    };

    return (
        <View style={[styles.container, style]}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Date of Birth:</Text>
            </View>
            <TouchableOpacity style={styles.bodyContainer} onPress={showDatePicker} onPressOut={onBlur}>
                <View style={styles.bodyTextContainer}>
                    {selectedDate ? (
                        <Text style={styles.bodyText}>{selectedDate.toLocaleDateString()}</Text>
                    ) : (
                        <Text style={styles.placeholderText}>{dateOfBirth}</Text>
                    )}
                </View>
                <View style={styles.iconContainer}>
                    <Entypo name="chevron-down" size={24} color="black"/>
                </View>
            </TouchableOpacity>

            {/* Error message */}
            {(errorMessage && visible) &&
                <View style={styles.errorTextContainer}>
                    <Text style={styles.errorText}>{errorMessage}</Text>
                </View>
            }

            {/* Date time picker modal */}
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                {...(selectedDate && {date : selectedDate})}
            />
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
        marginBottom : 10,
    },
    headerText : {
        color : colors.white,
        fontSize : Math.min( 16 * dimensions.scale, 22 ),
        letterSpacing : 1,
    },
    bodyContainer : {
        width : "100%",
        flexDirection : "row",
        alignItems : "center",
        borderBottomWidth : 1,
        borderBottomColor : colors.white,
    },
    bodyTextContainer : {
        flex : 1,
    },
    bodyText : {
        color : colors.black,
        fontSize : Math.min( 16 * dimensions.scale, 20 ),
    },
    iconContainer : {},
    placeholderText : {
        fontSize : Math.min( 16 * dimensions.scale, 22 ),
        color : "#00000040",
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
export default CustomDatePicker;