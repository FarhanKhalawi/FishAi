import {createStackNavigator} from "@react-navigation/stack";
import 'react-native-gesture-handler';

import routes from "../config/routes";

import mapScreen from "../screens/mapScreen";
import HISTORY_STACK from "./historyStack";
import ABOUT_STACK from "./aboutStack";
import PROFILE_STACK from "./profileStack";

const Stack = createStackNavigator();

const HOME_STACK = () => {
    return (
        <Stack.Navigator useLegacyImplementation screenOptions={{headerShown: false}}>
            <Stack.Screen name={routes.MAP_SCREEN} component={mapScreen}/>
            <Stack.Screen name={routes.HISTORY_STACK} component={HISTORY_STACK}/>
            <Stack.Screen name={routes.ABOUT_STACK} component={ABOUT_STACK}/>
            <Stack.Screen name={routes.PROFILE_STACK} component={PROFILE_STACK}/>
        </Stack.Navigator>
    );
};


export default HOME_STACK;