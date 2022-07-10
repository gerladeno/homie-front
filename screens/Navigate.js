import { useContext, useEffect } from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Auth from "./Auth";
import TokenContext from "../utils/context";
import Home from "./Home";
import Settings from "./Settings";
import Profile from "./Profile"
import SearchCriteria from "./SearchCriteria"
// const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

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
                        <Drawer.Screen name="Profile" component={Profile} />
                        <Drawer.Screen name="Search critera" component={SearchCriteria} />
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