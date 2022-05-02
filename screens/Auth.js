import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { TextInput, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Assets, Colors, Spacings, Typography, View, Text, Button, Keyboard, Incubator } from 'react-native-ui-lib'; //eslint-disable-line
const { TextField } = Incubator;
import { AuthApi } from '../API/Api'; //TODO use path ~
import TokenContext from '../utils/context';
import { SaveToken } from '../utils/authCheck';


const Stack = createNativeStackNavigator();

export default function Auth() {
    return (
        <Stack.Navigator defaultScreenOptions={'Confirm'}>
            <Stack.Screen name="InputPhone" component={InputPhone} />
            <Stack.Screen name="Confirm" component={Confirm} initialParams={this.props} />
        </Stack.Navigator>
    )
}

function InputPhone({ navigation }) {
    const [phoneNumber, onChangePhoneNumber] = React.useState("+79775298984")
    const [loading, onChangeLoadingStatus] = React.useState(false)
    const phoneInput = React.createRef();

    const onSubmit = () => {


        const valid = phoneInput.current?.validate?.();
        if (!valid) {
            return
        }
        // onChangeLoadingStatus(true)

        AuthApi.getInstance().sendSms(phoneNumber)
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
        <View flex>
            <View flex paddingH-25 paddingT-120>
                <TextField fieldStyle={styles.withUnderline}
                    ref={phoneInput}
                    placeholder={'Phone number'}
                    floatingPlaceholder
                    onChangeText={(value) => onChangePhoneNumber(value)}
                    enableErrors={true}
                    validate={['required', (value) => validatePhoneNumber(value)]}
                    validationMessage={['Field is required', 'Invalid phone number']}
                    keyboardType='phone-pad'
                    onSubmitEditing={() => onSubmit()}
                />
            </View>
            <View marginT-20>

                <Button
                    fullWidth
                    label="Send sms"
                    onPress={() => onSubmit()}
                >
                </Button>
            </View>

        </View>
    )
}

function validatePhoneNumber(phone) {
    var regexp = "^([\+]\d)?([0-9]{11})";

    const errorMessage = "Incorrect phone number"
    if (phone.length === 12 && phone[0] === '+') {
        return true
    }
    if (phone.length === 11 && phone[0] === '8') {
        return true
    }
    return false
}


function Confirm({ navigation, route }) {
    const [confirmCode, onChangeConfirmCode] = React.useState("")
    const [errorMessage, onChangeErrorMessage] = React.useState("")
    const [loading, onChangeLoadingStatus] = React.useState(false)
    const { token, onChangeToken } = React.useContext(TokenContext)
    const { phone } = route.params;

    const codeInput = React.createRef()
    const onSubmit = () => {
        const valid = codeInput.current?.validate?.();
        if (!valid){
            return
        }

        onChangeErrorMessage("")
        onChangeLoadingStatus(true)
        AuthApi.getInstance().confirm(phone, confirmCode)
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
        <View flex>
            <View flex paddingH-25 paddingT-120>
                <TextField fieldStyle={styles.withUnderline}
                    ref={codeInput}
                    placeholder={'Input confirm code'}
                    floatingPlaceholder
                    enableErrors={true}
                    validate={['required', (value) => value.length > 3]}
                    validationMessage={['Field is required', 'too short code']}
                    onSubmitEditing={() => onSubmit()}
                    keyboardType='number-pad'
                    onChangeText={(i) => onChangeConfirmCode(i)}
                    value={confirmCode}
                />
            </View>

            <View marginT-20>

                <Button
                    fullWidth
                    label="Confirm"
                    onPress={() => onSubmit()}
                >
                </Button>
            </View>
        </View>)
}

const styles = StyleSheet.create({
    withUnderline: {
        borderBottomWidth: 1,
        borderColor: Colors.$outlineDisabledHeavy,
        paddingBottom: 4
    }
})