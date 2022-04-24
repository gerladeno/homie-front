import * as SecureStore from 'expo-secure-store';

export async function SaveToken(token)
{
    const av = await SecureStore.isAvailableAsync()
    console.log("avialable", av)
    await SecureStore.setItemAsync('token', token);
}

export async function GetToken()
{
    const token = await SecureStore.getItemAsync('token');
    console.log("token:", token)
    return token
}