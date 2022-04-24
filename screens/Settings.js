import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import TokenContext from '../utils/context';
import { SaveToken } from '../utils/authCheck';
export default function Settings() {
    const {currentToken, onChangeToken} = React.useContext(TokenContext)
    return (
        <View style={styles.container}>
            <Text>Settings screens</Text>
            <Button title='logout'
                onPress={() => {
                    onChangeToken("")
                    SaveToken("")

                }}></Button>
            <StatusBar style="auto" />
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