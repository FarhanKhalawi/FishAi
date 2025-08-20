import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { colors, dimensions } from "../../config";

const CustomWhiteButton = ({title, onPress, isLoading}) => {
    return (
        <TouchableOpacity style={[styles.container]} onPress={onPress}>
            {isLoading ?
                (
                    <ActivityIndicator size={ "large" }/>

                ) : (
                    <Text style={[styles.titleText]}>{title}</Text>
                )}
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create( {
    container : {
        width : dimensions.whiteButtonWidth,
        height : Math.min( dimensions.mapComponentsHeight * dimensions.scale, 50 ),
        borderRadius : Math.min( dimensions.mapComponentsHeight * dimensions.scale, 50 ) / 2,
        backgroundColor : colors.white,
        alignItems : 'center',
        justifyContent : 'center',

        shadowColor : colors.black,
        shadowOffset : {
            width : 0,
            height : 2,
        },
        shadowOpacity : 0.23,
        shadowRadius : 2.62,

        elevation : 4,
    },
    titleText : {
        color : colors.black,
        fontWeight : 'bold',
        fontSize : Math.min( 20 * dimensions.scale, 24 ),
    }
} );

export default CustomWhiteButton;