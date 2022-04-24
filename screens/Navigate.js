import { useContext } from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Auth from "./Auth";
import TokenContext from "../utils/context";
import Home from "./Home";
import Settings from "./Settings";
const Tab = createBottomTabNavigator();

export default function Navigate() {
    const { currentToken, onChangeToken } = useContext(TokenContext)
    console.log("Navig token:", currentToken)
    isAuth = Boolean(currentToken)
    return (
        < NavigationContainer >
            {
                isAuth ?
                    (<Tab.Navigator >
                        <Tab.Screen name="Home" component={Home} />
                        <Tab.Screen name="Settings" component={Settings} />
                    </Tab.Navigator >)
                    :
                    (<Auth />)
            }
        </NavigationContainer >)
}