import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, dimensions } from "../config";

const CustomTransparentButton = ({ style, title, onPress, isLoading, disabled = false }) => {
    return (
        <TouchableOpacity disabled={ disabled } style={disabled ? [styles.container, style, styles.containerDisable] : [styles.container, style]} onPress={ onPress }>
            { isLoading ?
                (
                    <ActivityIndicator size={ "large" }/>
                ) : (

                    <Text style={disabled ? [styles.titleText, styles.titleTextDisable] : [styles.titleText]}>{ title }</Text>
                ) }
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container: {
        width: dimensions.transparentButtonWidth,
        height: Math.min(dimensions.transparentButtonHeight * dimensions.scale, 60),
        borderRadius: Math.min(dimensions.transparentButtonHeight * dimensions.scale, 60) / 2,

        borderStyle: "solid",
        borderWidth: 1,
        borderColor: colors.white,

        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,

        // shadowColor : colors.black,
        // shadowOffset : {
        //     width : 0,
        //     height : 1,
        // },
        // shadowOpacity : 0.22,
        // shadowRadius : 2.22,
        //
        // elevation : 3,
    },
    titleText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: Math.min(20 * dimensions.scale, 24),
    },
    containerDisable: {
        borderColor: "#ffffff50",
    },
    titleTextDisable: {
        color: "#ffffff50",
    },
});

export default CustomTransparentButton;