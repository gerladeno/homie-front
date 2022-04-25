import { useContext, useEffect } from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Auth from "./Auth";
import TokenContext from "../utils/context";
import Home from "./Home";
import Settings from "./Settings";
// const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

console.log("Navigate")
export default function Navigate() {
    const { currentToken, onChangeToken } = useContext(TokenContext)
    console.log("currentToken:", currentToken)
    return (
        currentToken
            ?
            (
                < NavigationContainer >
                    <Drawer.Navigator >
                        <Drawer.Screen name="Home" component={Home} />
                        <Drawer.Screen name="Settings" component={Settings} />
                    </Drawer.Navigator >
                </NavigationContainer >)
            :
            (<NavigationContainer>
                <Auth />
            </NavigationContainer >
            )
    )
}