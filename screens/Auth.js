import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Input } from '@rneui/themed';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Api from '../API/Api'; //TODO use path ~
import TokenContext from '../utils/context';
import { SaveToken } from '../utils/authCheck';

const api = new Api();

const Stack = createNativeStackNavigator();
export default function Auth()
{
    return (
        <Stack.Navigator defaultScreenOptions={'Confirm'}>
            <Stack.Screen name="InputPhone" component={InputPhone} />
            <Stack.Screen name="Confirm" component={Confirm} initialParams={this.props} />
        </Stack.Navigator>
    )
}

function InputPhone({ navigation }) {
    const [phoneNumber, onChangePhoneNumber] = React.useState("+79775298984")
    const [errorMessage, onChangeErrorMessage] = React.useState("")
    const [loading, onChangeLoadingStatus] = React.useState(false)

    const onSubmit = () => {
        const { validate, message } = CheckPhoneNumber(phoneNumber)
        if (!validate) {
            onChangeErrorMessage(message)
            return
        }
        onChangeErrorMessage("")
        onChangeLoadingStatus(true)
        api.sendSms(phoneNumber)
            .then((r) => {
                if (r.data.data === "Ok") {
                    onChangeLoadingStatus(false)
                    navigation.navigate('Confirm', { phone: phoneNumber })
                }
                else {
                    onChangeLoadingStatus(false)
                    onChangeErrorMessage("Ошибка при отправке СМС")
                }
            })
            .catch((e) => {
                onChangeLoadingStatus(false)
                onChangeErrorMessage("Ошибка при отправке СМС")
            })
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder='Input phone number'
                errorStyle={{ color: 'red' }}
                errorMessage={errorMessage}
                labelStyle={{ marginHorizontal: 50 }}
                dataDetectorTypes='phoneNumber'
                keyboardType='phone-pad'
                onSubmitEditing={() => onSubmit()}
                onChangeText={(i) => onChangePhoneNumber(i)}
                value={phoneNumber}
            />
            <Button
                title="Send sms"
                titleStyle={{ fontWeight: '300' }}
                loading={loading}
                buttonStyle={{
                    backgroundColor: 'rgba(111, 202, 186, 1)',
                    borderColor: 'transparent',
                }}
                containerStyle={{
                    alignSelf: 'stretch',
                    height: 50,
                    marginHorizontal: 50,
                    marginVertical: 50
                }}
                onPress={() => onSubmit()}
            />
        </View>)
}

function CheckPhoneNumber(phone) {
    var regexp = "^([\+]\d)?([0-9]{11})";

    const errorMessage = "Incorrect phone number"
    if (phone.length === 12 && phone[0] === '+') {
        return { validate: true, message: "" }
    }
    if (phone.length === 11 && phone[0] === '8') {
        return { validate: true, message: "" }
    }
    return { validate: false, message: errorMessage }
}


function Confirm({ navigation, route }) {
    const [confirmCode, onChangeConfirmCode] = React.useState("8984")
    const [errorMessage, onChangeErrorMessage] = React.useState("")
    const [loading, onChangeLoadingStatus] = React.useState(false)
    const { token, onChangeToken } = React.useContext(TokenContext)
    const { phone } = route.params;
    const onSubmit = () => {
        const { validate, message } = CheckConfirmCode(confirmCode)
        if (!validate) {
            onChangeErrorMessage(message)
            return
        }
        onChangeErrorMessage("")
        onChangeLoadingStatus(true)
        api.confirm(phone, confirmCode)
            .then((r) => {
                const token = r.data.data.token;
                if (token) {
                    onChangeLoadingStatus(false)
                    onChangeToken(token);
                    SaveToken(token)
                    console.log("success")
                }
                else {
                    onChangeLoadingStatus(false)
                    onChangeErrorMessage("Error during confirmation")
                }
            })
            .catch((e) => {
                console.log("Error:", e)
                onChangeLoadingStatus(false)
                onChangeErrorMessage("Error during confirmation")
            })
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder='Input confirm code'
                errorStyle={{ color: 'red' }}
                errorMessage={errorMessage}
                labelStyle={{ marginHorizontal: 50 }}
                dataDetectorTypes='phoneNumber'
                keyboardType='number-pad'
                onSubmitEditing={() => onSubmit()}
                onChangeText={(i) => onChangeConfirmCode(i)}
                value={confirmCode}
            />
            <Button
                title="Confirm"
                titleStyle={{ fontWeight: '300' }}
                loading={loading}
                buttonStyle={{
                    backgroundColor: 'rgba(111, 202, 186, 1)',
                    borderColor: 'transparent',
                }}
                containerStyle={{
                    alignSelf: 'stretch',
                    height: 50,
                    marginHorizontal: 50,
                    marginVertical: 50
                }}
                onPress={() => onSubmit()}
            />
        </View>)
}

function CheckConfirmCode(code) {
    const errorMessage = "Length confirm code must be more then four"
    if (code.length < 3) {
        return { validate: false, message: errorMessage }
    }

    return { validate: true, message: "" }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    input: {
        height: 40,
        alignSelf: 'stretch',
        margin: 12,
        width: 180,
        borderWidth: 1,
        padding: 10,
    },
});
