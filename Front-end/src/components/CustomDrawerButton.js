import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, dimensions} from "../config";
import {Octicons, Feather} from "@expo/vector-icons";

const CustomDrawerButton = ({style, title, onPress, icon, textColor}) => {
    return (
        <TouchableOpacity activeOpacity={0.5} style={[styles.container, style]} onPress={onPress}>
            <View style={styles.innerContainer}>
                <View style={styles.iconContainer}>
                    {icon === "history" ? (
                        <Octicons name="history" size={24} color={colors.drawerButtonText}/>
                    ) : icon === "info" ? (
                        <Octicons name="info" size={24} color={colors.drawerButtonText}/>
                    ) : icon === "logout" ? (
                        <Feather name="log-out" size={24} color={colors.RedText}/>
                    ) : null}
                </View>
                <View style={styles.textContainer}>
                    {title ?
                        (
                            <Text style={[styles.titleText, {color: textColor}]}>{title}</Text>
                        ) : (
                            <Text style={styles.titleText}>use the title prop to set the title</Text>
                        )}
                </View>
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: Math.min(dimensions.drawerButtonHeight * dimensions.scale, 50),

        alignItems: 'center',
        justifyContent: 'center',


    },
    innerContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    iconContainer: {
        marginHorizontal: 25
    },
    textContainer: {
        marginHorizontal: 10,
    },
    titleText: {
        color: colors.drawerButtonText,
        fontWeight: "bold",
        fontSize: Math.min(14 * dimensions.scale, 20),
    }
});

export default CustomDrawerButton;