import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase from 'firebase'
import { ScrollView } from 'react-native-gesture-handler';


import Btn from '../../../components/Btn'

export default class DonateForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            location: '',
            data: false,
            date: new Date()
        }
        this.getData = this.getData.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    getData(){
        firebase.firestore().collection('location').get().then((snapshot) => {
            this.setState({
                data: snapshot.docs.map(doc => doc.data()),
                location: snapshot.docs.map(doc => doc.data())[0].title
            })
        })
    }
    componentDidMount(){
        this.getData()
    }
    onChange(_, selectedDate){
        const currentDate = selectedDate || date;
        this.setState({
            date: currentDate
        })
    };
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.label}>Location</Text>
                    <Picker
                    selectedValue={this.state.location}
                    onValueChange={(itemValue) =>
                        this.setState({location: itemValue})
                    }>
                        {this.state.data && this.state.data.map(loc => <Picker.Item key={loc.id} label={loc.title} value={loc.title} />)}
                    </Picker>
                    <Text style={styles.label}>Date and time of appointment</Text>
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={this.state.date}
                    is24Hour={true}
                    mode="datetime"
                    minimumDate={new Date()}
                    display="default"
                    onChange={this.onChange}
                    minuteInterval={15}
                    />
                    <Btn text="Submit" onPress={() => {this.props.submit(this.state.location, this.state.date)}} />
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    label: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: '500'
    },
    container: {
        marginTop: '10%',
        padding: '5%'
    }
})
//<Picker.Item label="JavaScript" value="js" />