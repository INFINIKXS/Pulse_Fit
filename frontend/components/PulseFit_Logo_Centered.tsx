import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import logo from '../assets/images/pulsefit-logo.png';

// Centered version of the logo for use on SplashScreen
// Uses EXACTLY the same internal positioning as PulseFit_Logo, just centered on screen
export default function PulseFit_Logo_Centered({ style }: { style?: any }) {
    return (
        <View style={[styles.outerContainer, style]}>
            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} resizeMode="contain" />
                <Text style={styles.pulsefitText}>
                    {'Pulse'}
                    <Text style={styles.fitText}>{'FIT'}</Text>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        // This centers the logo wrapper on screen
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    logoContainer: {
        // The visual content spans roughly from left:32 (dumbbell) to ~left:250 (text end)
        // Visual center is around 140px, so we offset by moving the container left
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 320,  // Wide enough for all content
        height: 100, // Tall enough for content
        position: 'relative',
        marginLeft: -80, // Offset to center the visual content
    },
    logo: {
        // EXACT same as original PulseFit_Logo
        width: 191.42,
        height: 94.75,
        position: 'absolute',
        top: -3,
        left: 32,
        marginBottom: 1,
    },
    pulsefitText: {
        // EXACT same as original PulseFit_Logo
        fontFamily: 'Kadwa-Bold',
        fontWeight: '500',
        fontSize: 27.47,
        lineHeight: 31.47,
        letterSpacing: 1.52,
        color: '#fff',
        textAlign: 'center',
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 1,
        overflow: 'hidden',
        position: 'absolute',
        left: 122,
        top: 26,
    },
    fitText: {
        color: '#008000',
        fontFamily: 'Kadwa-Bold',
        fontWeight: '500',
    },
});
