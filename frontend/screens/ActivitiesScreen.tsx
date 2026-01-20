import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ActivitiesScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Activities Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'FamiljenGrotesk-Bold',
    },
});
