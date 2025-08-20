import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {colors, dimensions} from "../../config";
import CustomProfilePicture from "../CustomProfilePicture";

const CustomHeaderBar = ({profilePicOnPress, imageUri}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.picture} onPress={profilePicOnPress}>
                <CustomProfilePicture uri={imageUri} size={Math.min(dimensions.mapComponentsHeight * dimensions.scale, 50) - 5}/>
            </TouchableOpacity>
            <View>
                <Text style={styles.text}>Fish smarter, not harder ;-)</Text>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Math.min(dimensions.mapComponentsHeight * dimensions.scale, 50),
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: Math.min(dimensions.mapComponentsHeight * dimensions.scale, 50) / 2,

        flexDirection: "row",
    },
    picture: {
        paddingLeft: 4,
        paddingRight: 4,
    },
    text: {
        fontSize: Math.min(14 * dimensions.scale, 20),
    },

});

export default CustomHeaderBar;