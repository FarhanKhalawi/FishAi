import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';

import { dimensions } from "../config";

/**
 * CustomNavigationHeader
 * @param {string} title
 * @param {() => void} goBack
 * @param {true | false} titleShown
 * @param {'option' | 'edit'} optionIcon
 * @param {true | false} optionShown
 * @param {() => void} optionOnPress
 */
const CustomNavigationHeader = ({
                                    title = "",
                                    goBack,
                                    titleShown = true,
                                    optionIcon = "option",
                                    optionShown = true,
                                    optionOnPress,
                                }) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <TouchableOpacity style={styles.backContainer} onPress={goBack}>
                    <Entypo name="chevron-small-left" size={50} color="black"/>
                </TouchableOpacity>

                {titleShown && <Text style={styles.titleText}>{title}</Text>}
            </View>
            {optionShown &&
                <TouchableOpacity style={styles.rightContainer} onPress={optionOnPress}>
                    {optionIcon === "option" ? (
                        <Ionicons name={"ellipsis-horizontal"} size={40} color="black"/>
                    ) : optionIcon === "edit" ? (
                        <MaterialIcons name="edit" size={30} color="black"/>
                    ) : null}
                </TouchableOpacity>
            }
        </View>
    );
};

const styles = StyleSheet.create( {
    container : {
        width : "100%",
        alignItems : 'center',
        justifyContent : 'space-between',
        flexDirection : "row",

    },
    leftContainer : {
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "flex-start",
    },
    backContainer : {
        marginRight : dimensions.windowWidth * 0.1,
    },
    titleText : {
        fontWeight : "bold",
        fontSize : 24,
    },
    rightContainer : {
        paddingRight : 20,
    }
} );

export default CustomNavigationHeader;