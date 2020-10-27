import React, { useState } from 'react';
import firebase from 'firebase'
import 'firebase/firestore';
import 'firebase/auth'
import { StyleSheet, Text, View } from 'react-native';
import { useAuthState } from 'react-firebase-hooks/auth';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from 'react-native-gesture-handler';
import Btn from "../components/Btn";

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

const LogIn = (email, password, callback) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        callback()
    }).catch((err) => {
        console.log(err.code, err.message)
    })
}
const SignUp = (email, password, handleSuccess) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        handleSuccess();
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(`code: ${errorCode} msg: ${errorMessage}`)
    });
}
function SignUpChosen(props) {
    const [fname, setFname] = useState(false);
    const [lname, setLname] = useState(false);
    const [mnum, setMnum] = useState(false);
    const [email, setEmail] = useState(false);
    const [pass, setPass] = useState(false);
    return (
        <>
            <View style={{ padding: 30 }}>
                <TextInput autoCapitalize='none' editable placeholder="First Name" onChangeText={(text) => { setFname(text) }} style={styles.textInput} />
                <TextInput autoCapitalize='none' editable placeholder="Last Name" onChangeText={(text) => { setLname(text) }} style={styles.textInput} />
                <TextInput autoCapitalize='none' editable placeholder="Mobile Number" onChangeText={(text) => { setMnum(text) }} style={styles.textInput} />
                <TextInput autoCapitalize='none' editable placeholder="Email" onChangeText={(text) => { setEmail(text) }} style={styles.textInput} />
                <TextInput autoCapitalize='none' editable placeholder="Password" onChangeText={(text) => { setPass(text) }} style={styles.textInput} secureTextEntry />
                <Btn text="Sign up" onPress={() => {
                    if (fname && lname && mnum && email && pass) {
                        SignUp(email, pass, () => {
                            props.onSuccess()
                        })
                    }
                }} />
            </View>
        </>
    );
}
/*

     */
function MainDisplay({ navigation, onSuccess }) {
    const [user] = useAuthState(firebase.auth())
    const [pass, usePass] = useState(true);
    const [useremail, useUseremail] = useState(true)

    return (
        <View style={styles.container}>
            <View style={{ paddingTop: 90 }}>
                <Text style={styles.title} >PWADonate</Text>
            </View>
            <View style={{ paddingTop: 50 }}>
                <View>
                    <TextInput autoCapitalize='none' editable placeholder="Email" onChangeText={(text) => { useUseremail(text) }} style={styles.textInput} />
                    <TextInput autoCapitalize='none' editable placeholder="Password" onChangeText={(text) => { usePass(text) }} style={styles.textInput} secureTextEntry={true} />
                </View>
                <View style={{ paddingTop: 20 }} >
                    <Btn text="Log in" onPress={() => { LogIn(useremail, pass, onSuccess) }} />
                    <Btn text="Sign up" onPress={() => { navigation.navigate('Signup') }} />
                </View>
            </View>
        </View>
    );
    //TODO: Handle Sign in errors
}
const Stack = createStackNavigator();
function LoginScreen(props) {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" options={{ title: `Log in` }} >
                {prop => <MainDisplay {...prop} onSuccess={() => { props.onSuccess() }} />}
            </Stack.Screen>
            <Stack.Screen name="Signup" options={{ title: `Sign up` }} >
                {prop => <SignUpChosen {...prop} onSuccess={props.onSuccess} />}
            </Stack.Screen>
        </Stack.Navigator>
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
    },
    textInput: {
        borderColor: 'rgba(0, 0, 0, 0)',
        borderBottomColor: 'red',
        minWidth: '75%',
        minHeight: 50,
        borderBottomWidth: 3,
        marginBottom: 10
    },
    buttonFilled: {
        marginTop: 15,
        alignItems: "center",
        backgroundColor: "#ff0000",
        padding: 10,
        borderRadius: 25,
        textAlign: 'center',
        textAlignVertical: 'center',
    }
});

export default LoginScreen;