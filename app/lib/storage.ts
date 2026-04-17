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




// save user data
export const saveUser = async (user: any) => {
  await AsyncStorage.setItem('user', JSON.stringify(user))
}

export const getUser = async () => {
  const data = await AsyncStorage.getItem('user')
  return data ? JSON.parse(data) : null
}

export const removeUser = async () => {
  await AsyncStorage.removeItem('user')
}