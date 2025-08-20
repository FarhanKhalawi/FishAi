import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, dimensions } from "../config";
import Background_2 from "../../assets/Background_2.png"
import Paral_logo from "../../assets/paral_logo.png"
import fishAi_logo from "../../assets/logo_2.png"
import CustomScreenWithNavigationHeader from "../components/CustomScreenWithNavigationHeader";

const AboutScreen = ({ navigation }) => {
    return (
        <CustomScreenWithNavigationHeader style={ styles.container }
                                          contentContainerStyle={ styles.container }
                                          backgroundImage={ Background_2 }
                                          optionShown={ false }
                                          backOnPress={ () => navigation.goBack() }
                                          title={ "About" }
        >

            <View style={ styles.blueContainer }>
                <ScrollView contentContainerStyle={ styles.ScrollBlueContainer } scrollEventThrottle={ 16 }>
                    <Image source={ Paral_logo } style={ styles.paral_logo }/>
                    <View style={ styles.textContainer1 }>
                        <Text style={ styles.text1 }>Paral Dynamics AS develops cutting-edge software algorithms
                            utilizing artificial intelligence to solve complex problems across various
                            industries</Text>
                    </View>
                    <View style={ styles.textContainer2 }>
                        <Text style={ styles.text1 }>We are proud to present Fish-AI as part of our growing
                            portfolio</Text>
                    </View>
                    <Image source={ fishAi_logo } style={ styles.fishAi_logo }/>
                    <View style={ styles.lowerContainer }>
                        <View style={ styles.textContainer3 }>
                            <Text style={ styles.text3 }>Developed with ♥ by:</Text>
                        </View>
                        <View>
                            <Text style={ styles.text4 }>
                                Randa Ramzi Mostafa
                                {"\n"}
                                Berna Shalci
                                {"\n"}
                                Farhan Khalawi
                                {"\n"}
                                Rashed A. Rajab
                                {"\n"}
                                Othman Mamdouh Alkhellawi
                            </Text>
                        </View>
                    </View>
                    <View style={ { width: "90%", height: 2, backgroundColor: "black", marginTop: Math.min(35 * dimensions.scale, 35) } }/>
                    <View style={ styles.lowerContainer }>
                        <View style={ styles.textContainer3 }>
                            <Text style={ styles.text3 }>Contact Information:</Text>
                        </View>
                        <View>
                            <Text style={ styles.text4 }>
                                Email: post@paral.no
                                {"\n"}
                                Web: paral.no
                            </Text>
                        </View>
                    </View>

                </ScrollView>
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

        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    ScrollBlueContainer: {
        width: dimensions.windowWidth - 8,
        alignItems: "center",
        // justifyContent: "flex-start",
        paddingBottom: "25%",
    },
    paral_logo: {
        width: Math.min(320 * dimensions.scale, 420),
        height: Math.min(180 * dimensions.scale, 280),
        resizeMode: "contain"
    },
    textContainer1: {
        width: "96%",
        paddingBottom: Math.min(32 * dimensions.scale, 42),
    },
    text1: {
        color: colors.black,
        fontSize: Math.min(16 * dimensions.scale, 22),
        letterSpacing: 2,
        textAlign: "center",
    },
    textContainer2: {
        width: "96%",
        paddingBottom: Math.min(8 * dimensions.scale, 8),
    },
    fishAi_logo: {
        width: Math.min(230 * dimensions.scale, 330),
        height: Math.min(90 * dimensions.scale, 190),
        resizeMode: "contain"
    },
    lowerContainer: {
        width: "96%",
        alignItems: "flex-start",
        paddingTop: Math.min(35 * dimensions.scale, 35),

    },
    textContainer3: {
        width: "96%",
        paddingBottom: Math.min(8 * dimensions.scale, 8),
    },
    text3: {
        color: colors.black,
        fontSize: Math.min(16 * dimensions.scale, 22),
        fontWeight: "bold",
    },
    text4: {
        color: colors.black,
        fontSize: Math.min(16 * dimensions.scale, 22),
    },
});

export default AboutScreen;