import React, { Component } from 'react'
import { SafeAreaView, Text, View, StyleSheet, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import moment from 'moment'

import Btn from '../../components/Btn'
import DonateForm from './Forms/DonateForm'

const createAppointment = async (loc, date, cb) => {
    const user = firebase.auth().currentUser
    try{
        firebase.firestore().collection('sensitive').doc(user.uid).update({
            app: true
        })
        .then(() => {
            firebase.firestore().collection('requests').doc(user.uid).update({
                date: moment(date).format('MMM[/]D[/]YYYY'),
                location: loc,
                status: 'request',
                time: moment(date).format('HH:mm'),
            }).then(() => {
                cb(true)
            }).catch((err) => {
                console.log(err)
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }catch(err){
        console.log(err)
    }
}

const BookingModal = ({navigation, cb}) => {
    return (
        <View>
            <DonateForm submit={(loc, date) => {
                createAppointment(loc, date, cb);
                navigation.goBack()
            }} />
        </View>
    )
}

const DisplayData = ({status, data}) => {
    if (status === "request"){
        return(
            <View style={styles.infoContainer}>
                <Text style={styles.regText}>You have booked an appointment at <Text style={styles.bold}>{data.loc}</Text> on <Text style={styles.bold}>{data.date}</Text> at <Text style={styles.bold}>{data.time}</Text></Text>
            </View>
        )
    }else if (status === "approved"){
        return(
            <View style={styles.infoContainer}>
                <Text style={styles.regText}>Your next appointment is at <Text style={styles.bold}>{data.loc}</Text> on <Text style={styles.bold}>{data.date}</Text> at <Text style={styles.bold}>{data.time}</Text>. Your request has been approved</Text>
            </View>
        )
    }
}

const DisplayRejected = ({data}) => {
    return(
        <View style={styles.infoContainer}>
            <Text style={styles.regText}>Unfortunately, your appointment at <Text style={styles.bold}>{data.loc}</Text> on <Text style={styles.bold}>{data.date}</Text> at <Text style={styles.bold}>{data.time}</Text> has been rejected. Why don't you book another one!</Text>
        </View>
    )
}

const DisplayNone = () => {
    return(
        <View style={styles.infoContainer}>
            <Text style={styles.regText}>You don't have an appointment, why not book one now!</Text>
        </View>
    )
}

export class DonateScreenView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uid: '',
            app: '',
            data: false,
            appData: {
                date: '',
                time: '',
                status: '',
                loc: '',
            }
        }
        this.checkHasAppointment = this.checkHasAppointment.bind(this)
        this.getData = this.getData.bind(this)
    }
    async checkHasAppointment(){
        while (!firebase.auth().currentUser){}
        const uid = await firebase.auth().currentUser.uid
        firebase.firestore().collection('sensitive').doc(uid).get().then((snapshot) => {
            this.setState({
                uid: uid,
                app: snapshot.data().app
            })
        })
    }
    componentDidMount(){
        this.checkHasAppointment()
    }
    async getData(){
        const snapshot = await firebase.firestore().collection('requests').doc(this.state.uid).get()
        return({
            date: snapshot.data().date,
            time: snapshot.data().time,
            status: snapshot.data().status,
            loc: snapshot.data().location,
        })
    }
    render() {
            var returnObj = null
            if (this.state.app === ''){
                returnObj = (
                    <View style={styles.container}>
                        <Text>Loading...</Text>
                    </View>
                )
            }else if (this.state.app === true){
                if (!this.state.data){
                    this.getData()
                    .then((gdata) => {
                        this.setState({
                            data: true,
                            appData: gdata
                        })
                    })
                }
                if (this.state.appData.status === 'request'){
                    returnObj = (
                        <View style={{display: 'flex', alignItems: 'center'}}>
                            <DisplayData status="request" data={this.state.appData}/>
                        </View>
                    )
                }else if (this.state.appData.status === 'approved'){
                    returnObj = (
                        <View style={{display: 'flex', alignItems: 'center'}}>
                            <DisplayData status="approved" data={this.state.appData}/>
                        </View>
                    )
                }else if (this.state.appData.status === 'rejected'){
                    return (
                        <View style={{display: 'flex', alignItems: 'center'}}>
                            <DisplayRejected data={this.state.appData} />
                            <Btn text="Book appointment" onPress={() => {this.props.navigation.navigate('Book', {
                                cb: (success) => {
                                    if (success){
                                        this.state.appData.status = "request"
                                    }
                                }
                            })}} />
                        </View>
                    )
                }else{
                    <View style={styles.container}>
                        <Text>An Error occurred</Text>
                        <Text>Error code: 500</Text>
                    </View>
                }
            }else{
                return (
                    <View style={{display: 'flex', alignItems: 'center'}}>
                        <DisplayNone />
                        <Btn text="Book appointment" onPress={() => {this.props.navigation.navigate('Book', {
                            cb: (success) => {
                                if (success){
                                    this.state.appData.status = "request"
                                }
                            }
                        })}} />
                    </View>
                )
            }
            return returnObj;
    }
}
const Stack = createStackNavigator();
const DonateScreen = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen 
            name="Main"
            component={DonateScreenView}
            options={{ headerShown: false }}
            />
            <Stack.Screen name="Book" component={BookingModal}/>
        </Stack.Navigator>
    )
}

export default DonateScreen

const styles = StyleSheet.create({
    container: {
        padding: '10%',
    },
    infoContainer:{
        marginTop: '20%',
        padding: '5%',
        maxWidth: '90%',
        minHeight: '15%',
        borderRadius: 25,
        color: 'white',
        backgroundColor: 'red',
    },
    bold: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
    },
    regText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
    }
})
