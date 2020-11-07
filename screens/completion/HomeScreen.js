import React, {  Component } from 'react'
import { StyleSheet, Text, View, ScrollView, FlatList, SafeAreaView } from 'react-native'
import firebase from 'firebase'


class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cards: [],
            loaded: false
        }
        this.getCards = this.getCards.bind(this)
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
            console.log(JSON.stringify(data))
        })
    }
    render() {
        const Item = ({ title, text }) => (
            <View style={styles.item}>
                <Text style={styles.titleText}>{title}</Text>
            </View>
        )
        const renderItem = ({ item, index }) => {
            console.log(JSON.stringify(index))
            return(
                <Item title={item.title} />
            )
        }
        const HeaderItem = () => {
            return(
                <View>
                    <Text style={styles.titleText}>Hello world, {`\n ${firebase.auth().currentUser.email}`}</Text>
                </View>
            )
        }
        if (this.state.loaded){
            return(
                <FlatList
                    style={styles.container}
                    ListHeaderComponent={HeaderItem}
                    data={JSON.parse(this.state.cards)}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
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
        fontWeight: 'bold',
        fontSize: 30
    },
    item: {
        backgroundColor: '#f3f3f3',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    loadingText: {

    }
})
