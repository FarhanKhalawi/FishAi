import { ImageBackground, StyleSheet, View } from 'react-native';
import CustomNavigationHeader from "./CustomNavigationHeader";

import { dimensions } from "../config";

/**
 * CustomScreenWithNavigationHeader
 * @param {object} [backgroundImage] - The background image to be displayed in the screen.
 * @param {React.ReactNode} [children] - The content to be displayed in the screen.
 * @param {object} [contentContainerStyle] - The style object for the content container.
 * @param {() => void} [backOnPress] - The backOnPress object for the screen.
 * @param {() => void} [optionOnPress] - The function to be executed when the option icon is pressed.
 * @param {'option' | 'edit'} [optionIcon="option"] - The icon to be displayed in the option button.
 * @param {true | false} [optionShown=true] - Determines whether the option button should be shown.
 * @param {string} [title=""] - The title for the screen.
 * @param {object} [style] - The style object for the screen.
 * @param {true | false} [titleShown=true] - Determines whether the title should be shown in the header.
 */
const CustomScreenWithNavigationHeader = ({
                                              backgroundImage,
                                              children,
                                              contentContainerStyle,
                                              backOnPress = () => {
                                              },
                                              optionIcon = "option",
                                              optionOnPress,
                                              optionShown = true,
                                              title = "",
                                              style,
                                              titleShown = true,
                                          }) => {
    return (
        <ImageBackground source={URL = backgroundImage} style={[styles.container, style]}>
            <CustomNavigationHeader title={title} goBack={backOnPress}
                                    optionOnPress={optionOnPress} optionIcon={optionIcon} optionShown={optionShown}
                                    titleShown={titleShown}/>
            <View style={[styles.contentContainer, contentContainerStyle]}>
                {children}
            </View>
        </ImageBackground>
    );
};


const styles = StyleSheet.create( {
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'flex-start',
        paddingTop : dimensions.statusBarHeight,
    },
    contentContainer : {
        flex : 1,
        width : "100%",
        alignItems : 'center',
        justifyContent : 'center',
    },
} );

export default CustomScreenWithNavigationHeader;