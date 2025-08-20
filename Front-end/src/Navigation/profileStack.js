import {createStackNavigator} from "@react-navigation/stack";
import 'react-native-gesture-handler';

import routes from "../config/routes";

import ProfileScreen from "../screens/profileScreen";
import EditProfileScreen from "../screens/editProfileScreen";


const Stack = createStackNavigator();

function PROFILE_STACK() {

    return (
        <Stack.Navigator screenOption={{headerShown: false}}>
            <Stack.Screen name={routes.PROFILE_SCREEN} component={ProfileScreen} options={{headerShown: false}}/>
            <Stack.Screen name={routes.EDIT_PROFILE_SCREEN} component={EditProfileScreen}
                          options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

export default PROFILE_STACK;