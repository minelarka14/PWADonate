import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase'
import 'firebase/firestore';
import 'firebase/auth'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import { useAuthState } from 'react-firebase-hooks/auth';
import MainScreen from './screens/MainScreen';

import {REACT_APP_API_KEY, REACT_APP_APP_ID, REACT_APP_AUTH_DOMAIN, REACT_APP_DATABASE_URL, REACT_APP_MEAUREMENT_ID, REACT_APP_MESSAGING_SENDER_ID, REACT_APP_PROJECT_ID, REACT_APP_STORAGE_BUCKET} from './env' 


const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  databaseURL: REACT_APP_DATABASE_URL,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_APP_ID,
  measurementId: REACT_APP_MEAUREMENT_ID
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
function Finished({ navigation }) {
  return (
    <>
      <MainScreen logOutNavigate={() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        });
      }} />
    </>

  );
}
function Login({ navigation }) {
  return (
    <LoginScreen onSuccess={() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Finished' }],
      })
    }} />
  );
}
const Stack = createStackNavigator();
function App() {
  var [user] = useAuthState(firebase.auth())
  const [logged, setLogged] = useState(user ? `Finished` : `LoginScreen`)

  firebase.auth().onAuthStateChanged(() => {
    user ? setLogged(`Finished`) : setLogged(`LoginScreen`)
  })
  if (logged) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={`Finished`} >
          <Stack.Screen name="LoginScreen" component={Login} options={{ headerShown: false, headerLeft: null }} />
          <Stack.Screen name="Finished" component={Finished} options={{ title: `Home page`, headerLeft: null, gesturesEnabled: false, headerShown: false, }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={`LoginScreen`} >
          <Stack.Screen name="LoginScreen" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Finished" component={Finished} options={{ title: `Home page`, headerLeft: null, gesturesEnabled: false, headerShown: false, }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
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
