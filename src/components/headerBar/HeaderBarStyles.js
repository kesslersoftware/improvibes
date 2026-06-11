import { StyleSheet } from 'react-native'
import { StatusBar, Platform } from 'react-native'
const topInset = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 44
const paddingTop = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0
export const styles = StyleSheet.create({

})
