import * as SecureStore from 'expo-secure-store';

export async function SaveToken(token)
{
    await SecureStore.setItemAsync('token', token);
}

export async function GetToken()
{
    const token = await SecureStore.getItemAsync('token');
    return token
}