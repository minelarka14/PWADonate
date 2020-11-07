import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WebView } from 'react-native-webview';

const FindUsScreen = () => {
    return (
        <WebView source={{ uri: 'https://reactnative.dev/' }} />
    )
}

export default FindUsScreen

const styles = StyleSheet.create({})
//TODO: Create new website with a key, host on netlify and use WebView to look at it