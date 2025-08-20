import {createStackNavigator} from "@react-navigation/stack";

import routes from "../config/routes";

import HistoryScreen from "../screens/historyScreen";

const Stack = createStackNavigator();

function HISTORY_STACK() {

    return (
        <Stack.Navigator screenOption={{headerShown: false}}>
            <Stack.Screen name={routes.HISTORY_SCREEN} component={HistoryScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

export default HISTORY_STACK;