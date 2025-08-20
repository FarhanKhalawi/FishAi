import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from "@expo/vector-icons";

import CustomProfilePicture from "./CustomProfilePicture";
import {colors, dimensions} from "../config";
import CustomDrawerButton from "./CustomDrawerButton";
import { useContext } from "react";
import { UserContext } from "../logic/context";

const CustomDrawer = ({profileOnPress, historyOnPress, aboutOnPress, logoutOnPress, imageUri}) => {
    const { userData } = useContext(UserContext);
    return (
        <View style={styles.container}>
            {/* Header section */}
            <TouchableOpacity activeOpacity={0.7} style={styles.headerContainer} onPress={profileOnPress}>
                <View style={styles.profilePictureContainer}>
                    <CustomProfilePicture uri={imageUri} size={Math.min(80 * dimensions.scale, 100)}/>
                </View>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.usernameText}>{userData.nickname}</Text>
                    <Text style={styles.emailText}>{userData.email}</Text>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={Math.min(30 * dimensions.scale, 40)} color="black"/>
            </TouchableOpacity>


            {/* Body section */}
            <View style={styles.bodyContainer}>
                <View style={styles.screensButtons}>
                    <CustomDrawerButton title={"History"} icon={"history"} onPress={historyOnPress}/>
                    <View style={{backgroundColor: colors.drawerButtonText, height: 1}}/>
                    <CustomDrawerButton title={"About"} icon={"info"} onPress={aboutOnPress}/>
                </View>

                <View style={styles.logoutContainer}>
                    <View style={{backgroundColor: colors.drawerButtonText, height: 1}}/>
                    <CustomDrawerButton title={"Logout"} icon={"logout"} textColor={colors.RedText}
                                        onPress={logoutOnPress}/>
                </View>
            </View>
        </View>
    );
};

// TODO: change colors.
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        alignItems: 'flex-start',
        paddingBottom: 20
    },
    headerContainer: {
        backgroundColor: "#BEDAF5",
        width: "100%",
        height: "18%",

        paddingLeft: 20,
        paddingTop: 40,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    profilePictureContainer: {
        marginRight: 10,
    },
    headerTextContainer: {
        alignItems: "flex-start",
        flex: 1,
    },
    usernameText: {
        fontWeight: "bold",
        fontSize: Math.min(16 * dimensions.scale, 20),
    },
    emailText: {
        fontWeight: "bold",
        fontSize: Math.min(12 * dimensions.scale, 14),
        color: "#808080",
    },
    bodyContainer: {
        flex: 1,
        width: "100%",
    },
    screensButtons: {
        flex: 1,
    },
    logoutContainer: {},

});

export default CustomDrawer;