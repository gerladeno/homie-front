import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import TokenContext from '../utils/context';
import { SaveToken } from '../utils/authCheck';
export default function Settings() {
    const { currentToken, onChangeToken } = React.useContext(TokenContext)
    console.log("Settings")
    return (
        <View style={styles.container}>
            <Text>Settings screens</Text>
            <Button title='logout'
                onPress={() => {
                    onChangeToken("")
                    SaveToken("")
                }}></Button>
        </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});