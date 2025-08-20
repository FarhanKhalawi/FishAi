import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors, dimensions } from "../../config";

const CustomPositionCard = ({onPress, weight, latitude, longitude}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.upperContainer}>
                <Text style={styles.headerText}>{weight} tonn</Text>
            </View>
            <View style={styles.lowerContainer}>
                <Text style={styles.bodyHeaderText}>Coordinates</Text>
                <Text testID={"latitude"} style={styles.bodyText}>{latitude}° N</Text>
                <Text testID={"longitude"} style={styles.bodyText}>{longitude}° E</Text>
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create( {
    container : {
        width : Math.min( dimensions.positionCardWidth * dimensions.scale, 240 ),
        height : Math.min( dimensions.positionCardHeight * dimensions.scale, dimensions.positionCardHeight),
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 10,
    },
    upperContainer : {
        flex : 1,
        width : "100%",
        backgroundColor : colors.positionCardUpper,
        borderTopLeftRadius : 10,
        borderTopRightRadius : 10,

        alignItems : "center",
        justifyContent : "center",
    },
    lowerContainer : {
        flex : 1,
        width : "100%",
        backgroundColor : colors.positionCardLower,
        borderBottomLeftRadius : 10,
        borderBottomRightRadius : 10,
        paddingLeft : 10,

        alignItems : "flex-start",
        justifyContent : "flex-start",

    },

    headerText : {
        fontSize : Math.min( 26 * dimensions.scale, 36 ),
        fontWeight : "bold",

    },
    bodyHeaderText : {
        fontSize : Math.min( 14 * dimensions.scale, 24 ),
        color : colors.positionCardCoordinateText,
        paddingBottom : Math.min(5 * dimensions.scale, 5),
    },
    bodyText : {
        fontSize : Math.min( 16 * dimensions.scale, 26 ),
        color : colors.black,
    }
} );

export default CustomPositionCard;