import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'


// save token
export const saveToken = async (token: string) => {
  await SecureStore.setItemAsync('token', token)
}

export const getToken = async () => {
  return await SecureStore.getItemAsync('token')
}

export const removeToken = async () => {
  await SecureStore.deleteItemAsync('token')
}



