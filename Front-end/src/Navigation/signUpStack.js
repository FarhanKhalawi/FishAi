import {createStackNavigator} from "@react-navigation/stack";

import routes from "../config/routes";

import SignUpScreen from "../screens/signUpScreen";
import PrivacyPolicyScreen from "../screens/privacyPolicyScreen";


const Stack = createStackNavigator();

function SIGN_UP_STACK() {

    return (
        <Stack.Navigator screenOption={{headerShown: false}}>

            <Stack.Screen name={routes.SIGN_UP_SCREEN} component={SignUpScreen} options={{headerShown: false}}/>
            <Stack.Screen name={routes.PRIVACY_POLICY_SCREEN} component={PrivacyPolicyScreen}
                          options={{headerShown: false}}/>

        </Stack.Navigator>
    );
}

export default SIGN_UP_STACK;