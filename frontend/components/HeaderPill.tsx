import React, { useState, useContext, useEffect } from 'react';
import { View, Image, TouchableOpacity, TextInput, StyleSheet, Alert, Platform } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
    withDelay,
    runOnJS
} from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import { useScaling } from '../utils/scaling';
import { Ionicons } from '@expo/vector-icons';

// Assets
import defaultAvatar from '../assets/images/user-placeholder-icon.png'; // Correct placeholder
import { MessageModal, MessageTypes } from './MessageModal';

const HeaderPill = ({ onSearchChange }: { onSearchChange?: (text: string) => void }) => {
    const { s, vs, ms } = useScaling();

    const { userInfo, updateUserAvatar } = useContext(AuthContext)!;

    // State
    // We don't need local avatarUri state if we derive from userInfo
    // But we might want it for immediate feedback while uploading?
    // Let's use userInfo directly.
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState('');

    // Modal State
    const [warningModalVisible, setWarningModalVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalHeader, setModalHeader] = useState('');

    const handleSearchChange = (text: string) => {
        setSearchText(text);
        onSearchChange?.(text);
    };

    // Animation Values
    const COLLAPSED_WIDTH = s(97);
    const EXPANDED_WIDTH = s(250);
    const HEIGHT = vs(45);

    const width = useSharedValue(COLLAPSED_WIDTH);
    const opacityInput = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: width.value,
        };
    });

    const inputStyle = useAnimatedStyle(() => {
        return {
            opacity: opacityInput.value,
        };
    });

    const toggleSearch = () => {
        if (isSearchOpen) {
            // Close
            width.value = withTiming(COLLAPSED_WIDTH, { duration: 300, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
            opacityInput.value = withTiming(0, { duration: 200 });
            setIsSearchOpen(false);
            setSearchText('');
        } else {
            // Open
            width.value = withTiming(EXPANDED_WIDTH, { duration: 300, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
            opacityInput.value = withDelay(100, withTiming(1, { duration: 300 }));
            setIsSearchOpen(true);
        }
    };

    const handlePickImage = async () => {
        // If search is open, maybe close it or just ignore? Let's ignore to prevent confusion
        if (isSearchOpen) return;

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
            const uri = result.assets[0].uri;
            try {
                await updateUserAvatar(uri);
            } catch (error: any) {
                // console.error(error);
                let message = 'Failed to upload profile picture.';
                let header = 'Error';

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
            }
        }
    };

    return (
        <Animated.View style={[styles.container, animatedStyle, { height: HEIGHT, borderRadius: HEIGHT / 2 }]}>

            {/* Background for the pill */}
            <View style={[StyleSheet.absoluteFill, { backgroundColor: '#00B300', borderRadius: HEIGHT / 2 }]} />

            {/* Content Container */}
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: s(5) }}>

                {/* Mode: Collapsed - Show Avatar */}
                {/* We keep avatar visible but maybe hide it when expanded depending on UX. 
                    Design: "Green pill with face and Search icon". 
                    When expanding, typically the input takes over.
                    Let's hide avatar when search is fully open or animating?
                    For simplicity, let's conditionally render based on state for now, or fade it out.
                */}
                {!isSearchOpen && (
                    <TouchableOpacity onPress={handlePickImage} activeOpacity={0.8} style={{ zIndex: 10 }}>
                        <Image
                            source={userInfo?.avatar_signed_url ? { uri: userInfo.avatar_signed_url } : (userInfo?.avatar_url ? { uri: userInfo.avatar_url } /* Fallback to unsigned if signed missing? */ : defaultAvatar)}
                            style={{ width: HEIGHT - s(8), height: HEIGHT - s(8), borderRadius: (HEIGHT - s(8)) / 2, marginLeft: s(2), backgroundColor: '#E0E0E0' }}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>
                )}

                {/* Mode: Expanded (Input) */}
                {isSearchOpen && (
                    <Animated.View style={[{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: s(15) }, inputStyle]}>
                        <TextInput
                            style={{ flex: 1, color: 'white', fontFamily: 'FamiljenGrotesk-Regular', fontSize: ms(16), marginRight: s(5) }}
                            placeholder="Search..."
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            value={searchText}
                            onChangeText={handleSearchChange}
                            autoFocus
                        />
                    </Animated.View>
                )}

                {/* Search Icon / Close Icon */}
                <TouchableOpacity onPress={toggleSearch} style={{ marginRight: s(10), marginLeft: isSearchOpen ? 0 : 'auto' }}>
                    <Ionicons name={isSearchOpen ? "close-circle" : "search"} size={s(24)} color="white" />
                </TouchableOpacity>

            </View>

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
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        // Shadow/Elevation
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
});

export default HeaderPill;
