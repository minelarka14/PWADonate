import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import Btn from '../../components/Btn'
import firebase from 'firebase'
import 'firebase/auth'
import { createStackNavigator } from '@react-navigation/stack';
import { useAuthState } from 'react-firebase-hooks/auth';

var db = firebase.firestore();
const LogOut = () => {
    firebase.auth().signOut().catch(err => console.log(err))
}

function ModalScreen({ navigation }) {
    const [mnum, setMnum] = useState(``);
    const [add, setAdd] = useState(``)
    const [user] = useAuthState(firebase.auth())
    useEffect(() => {
        db.collection('sensitive').doc(user.uid).get().then((doc) => {
            if (doc.exists) {
                setMnum(doc.data().number)
                setAdd(doc.data().address)
            }
        })
    }, [])
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ display: 'flex', justifyContent: 'center', }}>
                <Text style={{ fontWeight: 'bold' }} >Mobile Number</Text>
                <TextInput autoCapitalize='none' value={mnum} editable placeholder="Mobile Number" onChangeText={(text) => { setMnum(text) }} style={styles.textInput} />
            </View>
            <View style={{ display: 'flex', justifyContent: 'center', }}>
                <Text style={{ fontWeight: 'bold' }} >Address</Text>
                <TextInput autoCapitalize='none' value={add} editable placeholder="Address" onChangeText={(text) => { setAdd(text) }} style={styles.textInput} />
            </View>

            <Btn onPress={() => navigation.goBack()} text="Submit" />
            <Btn onPress={() => navigation.goBack()} text="Dismiss" />
        </View>
    );
}
function Main({ navigation, logOutNavigate }) {
    return (
        <View style={{ padding: 40, paddingTop: 70 }}>
            <Btn text="Log out" onPress={() => { LogOut(); logOutNavigate() }} />
            <Btn text="Change Profile Data" onPress={() => { navigation.navigate('Change') }} />
        </View>
    )
}
const RootStack = createStackNavigator();
const SettingsScreen = ({ logOutNavigate }) => {
    return (
        <RootStack.Navigator mode="modal">
            <RootStack.Screen name="Go Back" options={{ headerShown: false }} >
                {props => <Main {...props} logOutNavigate={() => { logOutNavigate() }} />}
            </RootStack.Screen>
            <RootStack.Screen name="Change" component={ModalScreen} options={{ title: "Change Profile Data" }} />
        </RootStack.Navigator>
    )
}

const styles = StyleSheet.create({
    textInput: {
        borderColor: 'rgba(0, 0, 0, 0)',
        borderBottomColor: 'red',
        minWidth: '75%',
        minHeight: 50,
        borderBottomWidth: 3,
        marginBottom: 10,
    },
})

export default SettingsScreen

