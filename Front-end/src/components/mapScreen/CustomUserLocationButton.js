import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { colors, dimensions } from "../../config";
const CustomLocationButton = ({onPress, isUserLocationLoading}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            {isUserLocationLoading ? (<MaterialIcons name="my-location" size={24} color="black"/>) : (<ActivityIndicator size={"small"}/>)}
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create( {
    container : {
        width : Math.min(dimensions.mapComponentsHeight * dimensions.scale, 50 ),
        height : Math.min(dimensions.mapComponentsHeight * dimensions.scale, 50 ),
        borderRadius : Math.min(dimensions.mapComponentsHeight * dimensions.scale, 50 ) / 2,
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
} );

export default CustomLocationButton;