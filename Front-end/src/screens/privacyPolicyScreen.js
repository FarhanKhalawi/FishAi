import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useState} from "react";

import {colors, dimensions} from "../config";
import Background_2 from "../../assets/Background_2.png";
import routes from '../config/routes';

import PrivacyPolicyText from "../data/privacyPolicy";
import CustomScreenWithNavigationHeader from "../components/CustomScreenWithNavigationHeader";
import { signUpWithEmailAndPassword } from "../firebase";
import CustomTransparentButton from "../components/CustomTransparentButton";


const PrivacyPolicyScreen = ({navigation, route}) => {
    const [newUserInfo, setNewUserInfo] = useState(route.params);
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);  // a state to set button status (enable, disable).
    const [isSending, setIsSending] = useState(false);

    /* handle scrolling privacy policy text */
    const handleScroll = (event) => {
        const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
        const isAtEnd =
            layoutMeasurement.height + contentOffset.y >= contentSize.height - 1; // subtracted 1 to ensure enabling the button if decimals are not equal.
        setIsScrolledToBottom(isAtEnd);
    };

    const handleAgreePressed = async () => {
        setIsSending(true);
        await signUpWithEmailAndPassword(newUserInfo);
        setIsSending(false);
        navigation.navigate(routes.SIGN_IN_SCREEN);
    }
    return (
        <CustomScreenWithNavigationHeader style={styles.container}
                                          contentContainerStyle={styles.container}
                                          backgroundImage={Background_2}
                                          titleShown={false}
                                          optionShown={false}
                                          backOnPress={() => navigation.popToTop()}
        >
            <View style={styles.blueContainer}>
                <Text style={styles.titleText}>privacy policy</Text>
                <ScrollView style={styles.bodyText}
                            onScroll={handleScroll}
                            scrollEventThrottle={16}>
                    <PrivacyPolicyText/>
                </ScrollView>

                <View style={styles.buttonContainer}>
                    <CustomTransparentButton disabled={!isScrolledToBottom} isLoading={isSending} title={"AGREE"} onPress={handleAgreePressed}/>
                </View>
            </View>
        </CustomScreenWithNavigationHeader>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    blueContainer: {
        width: dimensions.windowWidth - 8,
        height: dimensions.windowHeight - 140,
        backgroundColor: colors.primaryBlue,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 24,

        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    titleText: {
        fontWeight: "bold",
        fontSize: Math.min(32 * dimensions.scale, 38),
        color: colors.white,
        textTransform: "uppercase",
        letterSpacing: 1,
        marginBottom: 10,
    },
    bodyText: {
        width: dimensions.windowWidth - 28,
    },
    buttonContainer: {
        width: dimensions.windowWidth,
        alignItems: "center",
        justifyContent: "center",
        marginTop: Math.min(dimensions.mapComponentsHeight * dimensions.scale, 50) / 2,
        marginBottom: Math.min(dimensions.mapComponentsHeight * dimensions.scale, 50),
    },
});

export default PrivacyPolicyScreen;