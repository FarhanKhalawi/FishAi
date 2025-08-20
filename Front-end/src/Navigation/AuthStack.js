import {createStackNavigator} from "@react-navigation/stack";

import routes from "../config/routes";

import SignInScreen from "../screens/signInScreen";
import ForgotPassword from "../screens/forgotPassword";
import SIGN_UP_STACK from "./signUpStack";


const Stack = createStackNavigator();

function AUTH_STACK() {

    return (
        <Stack.Navigator screenOption={{headerShown: false}}>

            <Stack.Screen name={routes.SIGN_IN_SCREEN} component={SignInScreen} options={{headerShown: false}}/>
            <Stack.Screen name={routes.FORGOT_PASSWORD_SCREEN} component={ForgotPassword}
                          options={{headerShown: false}}/>
            <Stack.Screen name={routes.SIGN_UP_STACK} component={SIGN_UP_STACK} options={{headerShown: false}}/>

        </Stack.Navigator>
    );
}

export default AUTH_STACK;