import React, { useEffect, useRef, useContext, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../context/AuthContext';
import PulseFit_Logo_Centered from '../components/PulseFit_Logo_Centered';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
    const { isLoading, userToken } = useContext(AuthContext);
    const fadeAnim = useRef(new Animated.Value(0)).current; // Logo fade in
    const bgAnim = useRef(new Animated.Value(0)).current;   // Reading for BG color interpolation
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const [animationDone, setAnimationDone] = useState(false);

    useEffect(() => {
        // Animation Sequence
        Animated.sequence([
            // 1. Fade in Logo on Black
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
            // 2. Wait
            Animated.delay(500),
        ]).start(() => {
            // Animation finished
            setAnimationDone(true);
        });
    }, []);

    // Navigate when BOTH animation is done AND auth loading is complete
    useEffect(() => {
        if (animationDone && !isLoading) {
            navigateNext();
        }
    }, [animationDone, isLoading]);

    const navigateNext = () => {
        if (userToken) {
            navigation.replace('Main');
        } else {
            navigation.replace('Login'); // Or Signup/Onboarding
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Animated.View style={[styles.logoContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
                <PulseFit_Logo_Centered />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000', // Start black
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
