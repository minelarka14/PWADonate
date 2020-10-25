import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase'
import 'firebase/firestore';
import 'firebase/auth'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen'

const firebaseConfig = {
  apiKey: "AIzaSyC1lpIDveOquJa5I4dikobpWPK-iwqf_4w",
  authDomain: "blooddonation-c247b.firebaseapp.com",
  databaseURL: "https://blooddonation-c247b.firebaseio.com",
  projectId: "blooddonation-c247b",
  storageBucket: "blooddonation-c247b.appspot.com",
  messagingSenderId: "978911600721",
  appId: "1:978911600721:web:b364a8fcc2df8722241870",
  measurementId: "G-Z3KDT7XSGT"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
function Finished() {
  return (
    <Text>hello world!</Text>
  );
}
function Login({ navigation }) {
  return (
    <LoginScreen onSuccess={() => { navigation.navigate('Finished') }} />
  );
}
const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Finished" component={Finished} options={{ title: `Home page` }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 35,
    color: 'black',
  }
});

export default App;
