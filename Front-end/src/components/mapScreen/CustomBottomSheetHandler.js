import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from "@expo/vector-icons";

import { colors, dimensions } from "../../config";

const CustomBottomSheetHandler = ({onPress, distance}) => {
    return (
        <View
            style={styles.container}
        >
            {distance && <Text style={styles.text}>Distance: {distance} km</Text>}
            <AntDesign
                style={styles.icon}
                name="closecircleo"
                size={24}
                color={colors.bottomSheetHandler}
                onPress={onPress}
            />
        </View>
    );
};



const styles = StyleSheet.create( {
    container : {
        width: "100%",
        height: 40,
        alignItems: "center",
        flexDirection: "row"
    },
    text:{
        position: "absolute",
        left: 20,
        fontSize : Math.min( 18 * dimensions.scale, 24 ),
        color: colors.positionCardCoordinateText,
        fontWeight: "bold",
    },
    icon:{
        position: "absolute",
        right: 10,
    }
} );

export default CustomBottomSheetHandler;