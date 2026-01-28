import React, { useEffect, useRef, useContext, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../context/AuthContext';
import { useScaling } from '../utils/scaling';
import PulseFit_Logo from '../components/PulseFit_Logo'; // Replaced Centered with Standard for absolute positioning
// import PulseFit_Logo_Centered from '../components/PulseFit_Logo_Centered'; // Unused
import api from '../services/api';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }: { navigation: any }) {
    const { isLoading, userToken, signOut, setUserInfo } = useContext(AuthContext)!;
    const { s, vs } = useScaling();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const [animationDone, setAnimationDone] = useState(false);

    useEffect(() => {
        // Animation Sequence
        Animated.sequence([
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 6,
                    useNativeDriver: true,
                }),
            ]),
            Animated.delay(500),
        ]).start(() => {
            setAnimationDone(true);
        });
    }, []);

    // Navigate when BOTH animation is done AND auth loading is complete
    useEffect(() => {
        if (animationDone && !isLoading) {
            navigateNext();
        }
    }, [animationDone, isLoading]);

    const navigateNext = async () => {
        if (userToken) {
            // Check if user has completed onboarding
            try {
                const response = await api.get('/users/me');
                const profile = response.data.data;

                // Update AuthContext with fresh profile data (includes avatar)
                setUserInfo(profile);

                if (profile?.onboarding_completed) {
                    navigation.replace('Main');
                } else {
                    // User exists but hasn't completed onboarding
                    navigation.replace('Onboarding1');
                }
            } catch (error: any) {
                console.error('Failed to fetch profile:', error);
                if (error.response?.status === 401) {
                    await signOut();
                    navigation.replace('Login');
                } else {
                    // Generic error - do not force onboarding, show retry
                    Alert.alert(
                        'Connection Error',
                        'Failed to load user profile. Please check your connection.',
                        [
                            { text: 'Retry', onPress: () => navigateNext() }
                        ]
                    );
                }
            }
        } else {
            navigation.replace('Login');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Animated.View style={{
                position: 'absolute',
                top: vs(374),
                left: s(90),
                width: s(211.75),
                height: s(104.84),
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }]
            }}>
                <PulseFit_Logo />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
