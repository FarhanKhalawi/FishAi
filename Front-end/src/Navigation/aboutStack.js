import {createStackNavigator} from "@react-navigation/stack";

import routes from "../config/routes";

import AboutScreen from "../screens/aboutScreen";


const Stack = createStackNavigator();

function ABOUT_STACK() {

    return (
        <Stack.Navigator screenOption={{headerShown: false}}>
            <Stack.Screen name={routes.ABOUT_SCREEN} component={AboutScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

export default ABOUT_STACK;