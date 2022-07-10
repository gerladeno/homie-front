import React, { useEffect, useState } from 'react';
import { CoreApi } from "../API/Api"
import { TextInput, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Assets, Colors, Spacings, Typography, View, Text, Button, Keyboard, Incubator, RadioGroup, RadioButton, Picker, Avatar } from 'react-native-ui-lib'; //eslint-disable-line
const { TextField } = Incubator;

const dropdown = require('../assets/icons/chevronDown.png');
const sexs = ["Male", "Female"]
export default function Profile() {
    const [age, setAge] = useState(0)
    const [sex, setSex] = useState("")
    const [name, setName] = useState("")
    const [instance, setInstance] = useState(null);

    useEffect(async () => {
        const instance = (await CoreApi).getInstance()
        setInstance(instance)
        tryLoadProfile(instance)
    }, [])

    function tryLoadProfile(instance) {
        console.log("tryLoadProfile", instance)
        instance.getConfig()
            .then(r => {
                console.log("Success", r.status)                
                if (r.status === 200) {
                    const data = r.data.data.personal;
                    setAge(data.age)
                    setSex({value: sexs[data.gender-1], label:sexs[data.gender-1]})
                    setName(data.username)
                }
            })
            .catch(e => {
                console.log("Error", e)
            })
    }

    function setProfile(data) {
        console.log("setProfile", instance)
        console.log("data", data)
        instance.setConfig(data)
            .then(r => {
                console.log("Success", r)
            })
            .catch(e => {
                console.log("Error", e)
            })
    }

    function onSubmit() {
        const data = {
            personal: {
                age: parseInt(age),
                gender: sex.value === "Male" ? 1 : (sex.value === "Female" ? 2 : 0),
                username: name
            }
        }
        setProfile(data)
    }
    //https://github.com/react-native-picker/picker
    return (
        <View flex>
            <ScrollView>
                <View flex paddingH-25 paddingT-20>
                    <View flex centerH>
                        <Avatar
                            // source={{ uri:  }}
                            backgroundColor={Colors.$backgroundWarning}
                            size={70}
                            label={name === "" ? "NL" : name} />
                    </View>
                    <View>
                        <TextField fieldStyle={styles.withUnderline}
                            placeholder={'Input name'}
                            value={name}
                            onChangeText={(v) => setName(v)}
                            floatingPlaceholder
                            enableErrors={true}
                            validate={['required', (value) => value.length > 3]}
                            validationMessage={['Field is required', 'too short name']}
                        // keyboardType='pad'
                        // onChangeText={(i) => onChangeConfirmCode(i)}
                        // value={confirmCode}
                        />

                        <TextField fieldStyle={styles.withUnderline}
                            placeholder={'Input Age'}
                            value={age.toString()}
                            onChangeText={(v) => setAge(v)}
                            floatingPlaceholder
                            enableErrors={true}
                            validate={['required', (value) => value > 18]}
                            validationMessage={['Field is required', 'too yong']}
                            keyboardType='number-pad'
                        // onChangeText={(i) => onChangeConfirmCode(i)}
                        // value={confirmCode}
                        />
                        {/* <View>
                    <RadioGroup paddingH-30 paddingV-10 row centerV spread initialValue={'Male'} onValueChange={() => console.log('value changed')}>
                        <RadioButton value={'Male'} label={'Male'} />
                        <RadioButton value={'Female'} label={'Female'} />
                    </RadioGroup>
                </View> */}
                        <Picker paddingV-10 fieldStyle={styles.withUnderline}
                            floatingPlaceholder
                            // useNativePicker
                            value={sex}
                            placeholder={'Input gender'}
                            onChange={(value) => setSex(value)}
                            migrateTextField
                            mode={Picker.modes.SINGLE}
                            topBarProps={{ title: 'Gender' }}

                        >
                            {sexs.map((v) => (<Picker.Item key={v} value={v} label={v} labelStyle={Typography.text65} />))}
                        </Picker>

                        <TextField fieldStyle={styles.withUnderline}
                            placeholder={'Bio'}
                            maxLength={80}
                            showCharCounter
                            floatingPlaceholder
                            enableErrors={true}
                            validate={['required', (value) => value > 18]}
                            validationMessage={['Field is required', 'too yong']}
                            keyboardType='ascii-capable'
                        />
                    </View>
                </View>
            </ScrollView>
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
}
)
