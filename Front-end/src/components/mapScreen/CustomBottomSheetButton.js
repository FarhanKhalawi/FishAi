import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, dimensions } from "../../config";

const CustomBottomSheetButton = ({ title, onPress, isLoading, disabled }) => {
    return (
        <TouchableOpacity disabled={ disabled }
                          style={ disabled ? [styles.container, styles.containerDisable] : [styles.container] }
                          onPress={ onPress }>
            { isLoading ?
                (
                    <ActivityIndicator size={ "large" }/>
                ) : (
                    <Text style={ [styles.titleText] }>{ title }</Text>
                ) }
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container: {
        width: dimensions.whiteButtonWidth,
        height: Math.min(dimensions.mapComponentsHeight * dimensions.scale, 50),
        borderRadius: Math.min(dimensions.mapComponentsHeight * dimensions.scale, 50) / 6,
        backgroundColor: colors.AddHistoryButton,
        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    containerDisable: {
        backgroundColor: colors.positionCardCoordinateText,
    },
    titleText: {
        color: colors.white,
        fontSize: Math.min(20 * dimensions.scale, 24),
    }
});

export default CustomBottomSheetButton;