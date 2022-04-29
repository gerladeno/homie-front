import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { CoreApi } from "../API/Api"

const instance = CoreApi.getInstance()

export default function Profile() {
    const [regions, setRegions] = useState([])
    console.log("!!!!!!!!!!!!!!!!Exec")
    useEffect(() => {
        tryLoadProfile()
    }, [])

    function tryLoadProfile() {
        instance.setConfig({
            personal: {
                username: "Maxik"
            }
        })
            .then(r => {
                console.log("Success", r.data)
            })
            .catch(e => {

                console.log("Error", e.data)
            })
    }
    return (
        <View style={styles.container}>
            <Text>Profile</Text>
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