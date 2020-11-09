import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, Text, View, FlatList, Linking, Platform } from 'react-native'
import firebase from 'firebase'


class FindUsScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {
            locations: false
        }
        this.getLocations = this.getLocations.bind(this)
    }
    async getLocations(){
        const snapshot = await firebase.firestore().collection('location').get()
        const data = snapshot.docs.map(doc => doc.data())
        this.setState({
            locations: JSON.stringify(data)
        })
    }
    componentDidMount(){
        this.getLocations()
    }
    render(){
        const Item = ({ title, loc, url }) => (
            <View style={styles.item}>
                <View onStartShouldSetResponder={() => {Linking.openURL(url)}}>
                    <Text style={styles.titleText}>{title}</Text>
                    <Text style={styles.itemText}>{loc}</Text>
                </View>
            </View>
        )
        const renderItem = ({ item }) => {
            const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
            const latLng = `${item.lat},${item.long}`;
            const label = item.title;
            const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
            });
            return(
                <Item title={item.title} loc={item.subtitle} url={url} />
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
        const Header = () => (
            <Text style={styles.titleText}>You can find us at the following locations!</Text>
        )
        if (this.state.locations){
            return(
                <FlatList 
                style={styles.container}
                data={JSON.parse(this.state.locations)}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={Seperator}
                ListHeaderComponent={Header}
                />
            )
        }else{
            return (
                <Text>Loading</Text>
            )
        }
    }
}

export default FindUsScreen

const styles = StyleSheet.create({
    container: {
        padding: '10%',
        paddingTop: '15%',
    },
    titleText: {
        fontWeight: '600',
        fontSize: 25,
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
