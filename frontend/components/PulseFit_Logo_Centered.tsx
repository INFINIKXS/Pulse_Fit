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
        // Visual center is now natural with Flexbox
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // width: 320,  // Removed fixed width
        // height: 100, // Removed fixed height
        // position: 'relative',
        // marginLeft: -80, // Removed offset
        gap: -30, // Adjust gap to overlap image and text nicely
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginRight: 10,
    },
    pulsefitText: {
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
        marginTop: 0,
    },
    fitText: {
        color: '#008000',
        fontFamily: 'Kadwa-Bold',
        fontWeight: '500',
    },
});
