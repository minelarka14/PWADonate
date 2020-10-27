import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
function Btn(props) {
    return (
        <TouchableOpacity style={{ paddingVertical: 7. }} onPress={props.onPress} >
            <View style={{ borderRadius: 25, paddingVertical: 14, paddingHorizontal: 10, backgroundColor: 'red', minWidth: '80%' }}>
                <Text style={styles.buttonText}>{props.text}</Text>
            </View>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    buttonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
        textAlign: 'center',
    }
});
export default Btn;