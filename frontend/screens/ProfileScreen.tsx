import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import * as ImagePicker from 'expo-image-picker';

// Placeholder image - assuming it's available as in OnboardingScreen1
// You might want to move this to a shared constants or verify path if it fails, 
// but for now we'll try to require it or use a default URL/Icon if imports fail.
// Better: stick to the pattern in OnboardingScreen1 if possible, but I don't want to guess the relative path if it's deeply nested.
// OnboardingScreen1 is in screens/, ProfileScreen is in screens/, so path should be same:
import userPlaceholder from '../assets/images/user-placeholder-icon.png';
import cameraIcon from '../assets/images/camera-icon.png';
import { MessageModal, MessageTypes } from '../components/MessageModal';

export default function ProfileScreen({ navigation }: any) {
    const { signOut, userInfo, updateUserAvatar } = useContext(AuthContext)!;
    const [uploading, setUploading] = useState(false);

    // Modal state
    const [warningModalVisible, setWarningModalVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const [modalHeader, setModalHeader] = useState('');

    const handlePickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert("Permission Required", "You've refused to allow this app to access your photos!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            await handleUpload(result.assets[0].uri);
        }
    };

    const handleUpload = async (uri: string) => {
        setUploading(true);
        try {
            await updateUserAvatar(uri);
            Alert.alert('Success', 'Profile picture updated successfully');
        } catch (error: any) {
            console.error('Failed to upload avatar', error);

            let message = 'Failed to update profile picture';
            let header = 'Error';

            // Check for specific error message if passed up from AuthContext
            // AuthContext throws Error(`Upload failed: ${status}`)
            // We might want to improve AuthContext to pass the JSON error body

            if (error.message?.includes('413') || error.message?.includes('Too Large')) {
                message = "The image file is too large. Please choose a smaller image (max 5MB).";
                setModalHeader("File Too Large");
                setModalMessage(message);
                setWarningModalVisible(true);
            } else {
                setModalHeader("Upload Failed");
                setModalMessage(message);
                setErrorModalVisible(true);
            }
        } finally {
            setUploading(false);
        }
    }

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

            <View style={styles.avatarContainer}>
                <TouchableOpacity onPress={handlePickImage} disabled={uploading} style={styles.avatarWrapper}>
                    {uploading ? (
                        <ActivityIndicator size="large" color="#00FF00" />
                    ) : (
                        <Image
                            source={userInfo?.avatar_signed_url ? { uri: userInfo.avatar_signed_url } : (userInfo?.avatar_url && userInfo.avatar_url.startsWith('http') ? { uri: userInfo.avatar_url } : userPlaceholder)}
                            style={styles.avatar}
                        />
                    )}
                    <View style={styles.cameraIconBadge}>
                        <Image source={cameraIcon} style={styles.cameraIcon} />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.infoCard}>
                <Text style={styles.label}>Name</Text>
                <Text style={styles.value}>{userInfo?.full_name || 'Not set'}</Text>
            </View>

            <View style={styles.infoCard}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>{userInfo?.email || 'Not set'}</Text>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>

            {/* Modals */}
            <MessageModal
                visible={warningModalVisible}
                messageType={MessageTypes.WARNING}
                headerText={modalHeader}
                messageText={modalMessage}
                buttonText="Okay"
                onDismiss={() => setWarningModalVisible(false)}
            />

            <MessageModal
                visible={errorModalVisible}
                messageType={MessageTypes.FAIL}
                headerText={modalHeader}
                messageText={modalMessage}
                buttonText="Close"
                onDismiss={() => setErrorModalVisible(false)}
            />
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
        textAlign: 'center', // Center title to match avatar alignment
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    avatarWrapper: {
        position: 'relative',
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#333',
    },
    cameraIconBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#00FF00',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#000',
    },
    cameraIcon: {
        width: 20,
        height: 20,
        tintColor: '#000',
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
