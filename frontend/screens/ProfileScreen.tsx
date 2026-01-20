import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function ProfileScreen({ navigation }: any) {
    const { signOut, userInfo } = useContext(AuthContext)!;

    const handleLogout = async () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        await signOut();
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }],
                        });
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>

            <View style={styles.infoCard}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>{userInfo?.email || 'Not set'}</Text>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    title: {
        color: '#fff',
        fontSize: 28,
        fontFamily: 'FamiljenGrotesk-Bold',
        marginBottom: 30,
    },
    infoCard: {
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
    },
    label: {
        color: '#888',
        fontSize: 14,
        fontFamily: 'FamiljenGrotesk-Regular',
        marginBottom: 4,
    },
    value: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'FamiljenGrotesk-Bold',
    },
    logoutButton: {
        backgroundColor: '#ff4444',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: 40,
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'FamiljenGrotesk-Bold',
    },
});
