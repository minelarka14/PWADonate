import React, {  Component } from 'react'
import { StyleSheet, Text, View, FlatList, SafeAreaView, Linking, Alert, Platform } from 'react-native'
import firebase from 'firebase'
import Ionicons from 'react-native-vector-icons/Ionicons';


import { PHONE_NUMBER } from '../../env'


class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cards: [],
            loaded: false,
        }
        this.getCards = this.getCards.bind(this)
        this.handleContactUs = this.handleContactUs.bind(this)
    }
    async getCards(cb) {
        const snapshot = await firebase.firestore().collection('cards').get()
        const data = snapshot.docs.map(doc => doc.data());
        cb(data);
    }
    componentDidMount(){
        this.getCards((data) => {
            this.setState({
                cards: JSON.stringify(data),
                loaded: true
            });
        })
    }
    handleClick(url){
        Linking.openURL(url)
    }
    handleContactUs(){
        const handleCall = (ios) => {
            if (ios){
                Linking.openURL('telprompt:' + PHONE_NUMBER)
            }else{
                Linking.openURL('tel:' + PHONE_NUMBER)
            }
        }
        const handleEmail = () => {
            Linking.openURL('mailto:info@pwa-chk.org.pk')
        }
        const handleWeb = () => {
            Linking.openURL('https://pwa-chk.org.pk/')
        }
        if (Platform.OS === "android"){
            Alert.alert(
                "Contact us",
                "How would you like to contact us?",
                [
                    {
                        text: "Call us",
                        onPress: () => {handleCall(false)}
                    },
                    {
                        text: "Email us",
                        onPress: () => {handleEmail()}

                    },
                    {
                        text: "Visit our website",
                        onPress: () => {handleWeb()}
                    },
                ],
                {onDismiss: () => {}}
            )
        }else {
            Alert.alert(
                "Contact us",
                "How would you like to contact us?",
                [
                    {
                        text: "Call us",
                        onPress: () => {handleCall(true)}
                    },
                    {
                        text: "Email us",
                        onPress: () => {handleEmail()}
                    },
                    {
                        text: "Visit our website",
                        onPress: () => {handleWeb()}
                    },
                    {
                        text: "Cancel",
                        style: 'cancel'
                    }
                ]
            )
        }
    }
    render() {
        const Item = ({ title, text, url }) => (
            <View style={styles.item}>
                <View onStartShouldSetResponder={() => {this.handleClick( url)}}>
                    <Text style={styles.titleText}>{title}</Text>
                    <Text style={styles.itemText}>{text}</Text>
                </View>
            </View>
        )
        const renderItem = ({ item }) => (
            <Item url={item.url} title={item.title} text={item.text} />
        )
        const HeaderItem = () => {
            return(
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <View style={{maxWidth: '95%'}}>
                        <Text style={styles.titleText}>Hello,{`\n`}<Text style={styles.itemText}>Here's the latest news from PWA</Text></Text> 
                    </View>
                    <Ionicons onPress={this.handleContactUs} name="ios-call" size={32} color="tomato" />
                </View>
            )
        }
        const Seperator = () => (
            <View
                style={{
                    backgroundColor: '#c3c3c3',
                    height: 2,
                }}
            />
        )
        if (this.state.loaded){
            return(
                <FlatList
                    style={styles.container}
                    ListHeaderComponent={HeaderItem}
                    data={JSON.parse(this.state.cards)}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={Seperator}
                />
            )
        }else{
            return(
                <SafeAreaView>
                    <Text>Loading...</Text>
                </SafeAreaView>
            )
        }
    }
}


export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        padding: '10%',
        paddingTop: '15%',
    },
    titleText: {
        fontWeight: '600',
        fontSize: 30,
        padding: 8,
    },
    item: {
        padding: '5%',
        marginVertical: 8,
    },
    itemText: {
        fontSize: 22,
        fontWeight: '400'
    }
})
