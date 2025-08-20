import { StyleSheet, Text, View } from 'react-native';
import { dimensions } from "../config";

const PrivacyPolicyText = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.paragraphTitle}>
                Fish-AI
            </Text>
            <Text style={styles.paragraph}>
                The type of information this application collect are email, phone number, and location. Phone numbers and email addresses are collected from the app registration, and for the location, GPS technology is used to collect the information if the user accepts. The app does not plan on reselling the data, nor does the app plan to send the user news and promotions. The reason why the application needs to collect user information is to make an account so that they can log which route they have taken and how much fish they got. This way the user can access the history log if they want to find back to an earlier route and its information. When the user logs in for the first time a privacy policy window shows up to inform what the company does with their information.
            </Text>
            <Text style={styles.paragraphTitle}>
                Security
            </Text>
            <Text style={styles.paragraph}>
                This application does not share any user data with third parties. To avoid data leakage. The way we are protecting the user information is by using the Firebase database, Firebase authentication, and Firebase cloud store.
            </Text>
            <Text style={styles.paragraphTitle}>
                GDPR
            </Text>
            <Text style={styles.paragraph}>
                GDPR is an EU regulation that establishes new rules for data protection for all EU and EEA nations. The regulation, which attempts to protect our personal data went into effect in 2018. General Data Protection Regulation, or GDPR, requires that every one of us have active access to the information we need and the ability to consent to businesses collecting and utilizing the information we share with them. The information this project includes is email, password, and phone number after they have signed in. When the user logs in for the first time, it will ask for permission to track its position since it will use its location to track which destination will give the most fish. The position is used to track where the boat is located to show which destination will lead to the most fish. UiA has some rules when it comes to GDPR that all its systems have to follow, therefore our application has to follow the same rules as the other services including the rules and guidelines in GDPR.
            </Text>
            <Text style={styles.paragraph}>
                GDPR does not specify a specific time frame, but it is important to not keep the information longer than necessary. This application does therefore only store that data as long as there is a user, the moment the account is deleted, the information will also be deleted.
            </Text>

            <Text style={styles.paragraphTitle}>
                Legal disputes
            </Text>
            <Text style={styles.paragraph}>
                We might disclose your information to affiliates that FishAI has thoroughly verified and established a partnership with. The app is collecting the user's position so that it can show which route to take from where they are located, to capture the most amount of fish.
            </Text>
        </View>
    );
};


const styles = StyleSheet.create( {
    container : {
        flex : 1,
        alignItems : 'flex-start',
        justifyContent : 'center',
    },
    paragraphTitle : {
        marginTop : 12,
        fontSize : Math.min( 16 * dimensions.scale, 24 ),
        fontWeight : 'bold',
        textAlign : 'left',
    },
    paragraph : {
        marginTop : 12,
        fontSize : Math.min( 14 * dimensions.scale, 20 ),
        textAlign : 'left',
    },
} );

export default PrivacyPolicyText;