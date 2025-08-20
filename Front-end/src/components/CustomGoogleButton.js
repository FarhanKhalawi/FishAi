import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, dimensions } from "../config";
import googleLogo from "../../assets/GoogleLogo.png"

const CustomGoogleButton = ({style, title, onPress}) => {
    return (
        <TouchableOpacity activeOpacity={0.5} style={[styles.container, style]} onPress={onPress}>
            <View style={styles.innerContainer}>
                <View style={styles.iconContainer}>
                    <Image source={googleLogo} style={styles.icon}/>
                </View>
                <View style={styles.textContainer}>
                    {title ?
                        (
                            <Text style={[styles.titleText]}>{title}</Text>
                        ) : (
                            <Text style={styles.titleText}>use the title prop to set the title</Text>
                        )}
                </View>
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create( {
    container : {
        width : dimensions.transparentButtonWidth,
        height : Math.min( dimensions.googleButtonHeight * dimensions.scale, 50 ),
        borderRadius : 10,

        backgroundColor : colors.white,

        alignItems : 'center',
        justifyContent : 'center',
        marginVertical : 10,

        shadowColor : "#000",
        shadowOffset : {
            width : 0,
            height : 2,
        },
        shadowOpacity : 0.23,
        shadowRadius : 2.62,
        elevation : 4,
    },
    innerContainer:{
        width: "80%",
        flexDirection : "row",
        alignItems : 'center',
        justifyContent : 'center',
    },
    iconContainer : {},
    icon : {
        width : Math.min( 24 * dimensions.scale, 28 ),
        height : Math.min( 24 * dimensions.scale, 28 ),
        marginHorizontal: 7.5,
    },
    textContainer : {
        marginHorizontal: 7.5,
    },
    titleText : {
        color : "#00000080",
        fontWeight : 'bold',
        fontSize : Math.min( 20 * dimensions.scale, 24 ),
    }
} );

export default CustomGoogleButton;