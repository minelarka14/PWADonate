import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
function Btn({text, onPress}) {
    return (
        <TouchableOpacity style={{ paddingVertical: 7. }} onPress={onPress} >
            <View style={styles.container}>
                <Text style={styles.buttonText}>{text}</Text>
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
    },
    container: { 
        borderRadius: 25, 
        paddingVertical: 14, 
        paddingHorizontal: 10, 
        backgroundColor: 'red', 
        minWidth: '80%'
    }
});
export default Btn;