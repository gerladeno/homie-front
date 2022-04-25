import * as SecureStore from 'expo-secure-store';

export async function SaveToken(token)
{
    const av = await SecureStore.isAvailableAsync()
    await SecureStore.setItemAsync('token', token);
}

export async function GetToken()
{
    const token = await SecureStore.getItemAsync('token');
    return token
}