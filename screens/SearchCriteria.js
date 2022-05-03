import React, { useEffect, useState } from 'react';
import { CoreApi } from "../API/Api"
import { TextInput, StyleSheet, ScrollView, ActivityIndicator, Grid } from 'react-native';
import { Assets, Colors, Spacings, Typography, View, Text, Button, Keyboard, Incubator, RadioGroup, RadioButton, Picker } from 'react-native-ui-lib'; //eslint-disable-line
const { TextField } = Incubator;
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const dropdown = require('../assets/icons/chevronDown.png');
const instance = CoreApi.getInstance()

export default function SearchCriteria() {
    const [regions, setRegions] = useState([])
    const [selectedRegions, setSelectedRegions] = useState([])
    const [priceRange, setPriceRange] = useState([30000, 50000])
    const [priceFrom, setPriceFrom] = useState("30000")
    const [priceTo, setPriceTo] = useState("50000")

    useEffect(() => {
        LoadRegions()
        
    }, [])

    function LoadRegions() {
        instance.regions()
            .then(({ data }) => {
                setRegions(data.data.map(m => {
                    return { label: m.name, value: m.id }
                })
                )
            })
    }
    //https://github.com/react-native-picker/picker
    return (
        <View flex>
            <View flex paddingH-25 paddingT-20>
                <Picker paddingV-10 fieldStyle={styles.withUnderline}
                    floatingPlaceholder

                    value={selectedRegions}
                    placeholder={'Select regions'}
                    onChange={items => {
                        setSelectedRegions(items)
                        console.log("sel regs", items)
                    }}
                    migrateTextField
                    mode={Picker.modes.MULTI}
                    topBarProps={{ title: 'Regions' }}
                    showSearch
                >
                    {regions.map((v) => (<Picker.Item key={v.value.toString()} value={v} label={v.label} labelStyle={Typography.text65} />))}
                </Picker>
                <View float spread row>
                    <TextField 
                    containerStyle={{width: 100}}
                        placeholder={'From price'}
                        floatingPlaceholder
                        value={priceFrom}
                        onChangeText={(v) => {
                            setPriceFrom(v)
                        }}
                        onSubmitEditing={() => {
                            setPriceRange([parseInt(priceFrom), priceRange[1]])
                        }}


                    // onChangeText={(value) => onChangePhoneNumber(value)}
                    // enableErrors={true}
                    // validate={['required', (value) => validatePhoneNumber(value)]}
                    // validationMessage={['Field is required', 'Invalid phone number']}
                    // keyboardType='phone-pad'
                    // onSubmitEditing={() => onSubmit()}
                    />

                    <TextField
                    containerStyle={{width: 100}}
                        placeholder={'To price'}
                        floatingPlaceholder
                        value={priceTo}
                        onChangeText={(v) => {
                            setPriceTo(v)
                        }}
                        onSubmitEditing={() => {
                            setPriceRange([priceRange[0], parseInt(priceTo)])
                        }}
                    />


                </View>
                <View flex paddingH-10  centerH>
                    
                    <MultiSlider 
                    values={[priceRange[0], priceRange[1]]}
                        sliderLength={250}
                        onValuesChangeFinish={changes => {
                            setPriceRange(changes)
                            setPriceFrom(changes[0].toString())
                            setPriceTo(changes[1].toString())
                        }}
                        sliderLength={350} //TODO: Adaptive
                        min={10000}
                        max={100000}
                        step={1000}
                        snapped
                    />
                </View>
            </View>
            {/* <View flex row>
            <TextField fieldStyle={styles.withUnderline}
                    placeholder={'From price'}
                    floatingPlaceholder
                    // onChangeText={(value) => onChangePhoneNumber(value)}
                    // enableErrors={true}
                    // validate={['required', (value) => validatePhoneNumber(value)]}
                    // validationMessage={['Field is required', 'Invalid phone number']}
                    // keyboardType='phone-pad'
                    // onSubmitEditing={() => onSubmit()}
                />
                <TextField fieldStyle={styles.withUnderline}
                    placeholder={'To price'}
                    floatingPlaceholder
                    // onChangeText={(value) => onChangePhoneNumber(value)}
                    // enableErrors={true}
                    // validate={['required', (value) => validatePhoneNumber(value)]}
                    // validationMessage={['Field is required', 'Invalid phone number']}
                    // keyboardType='phone-pad'
                    // onSubmitEditing={() => onSubmit()}
                />
            </View> */}

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
