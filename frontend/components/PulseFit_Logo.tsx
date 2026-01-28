import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import logo from '../assets/images/pulsefit-logo.png';
import { useScaling } from '../utils/scaling';

export default function PulseFit_Logo({ style, scale = 1 }: { style?: any, scale?: number }) {
  const { s, vs, ms } = useScaling();

  return (
    <View style={[styles.container, style, { transform: [{ scale }] }]}>
      <Image source={logo} style={[styles.logo, {
        width: s(67.04),
        height: s(89)
      }]} resizeMode="stretch" />
      <Text style={[styles.pulsefitText, {
        fontSize: s(25.47), // Use strict scaling to match icon growth
        lineHeight: s(46),
        letterSpacing: s(1.52),
        marginLeft: s(-31.6),
        marginTop: vs(20.86),
        // width: s(141), // Removed to prevent truncation ("it part of fit is missing")
        // height: vs(61), // Removed to allow natural height
      }]}>
        {'Pulse'}
        <Text style={styles.fitText}>{'FIT'}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  logo: {
    // Dimensions handled in inline styles for scaling access
    transform: [{ rotate: '-0.12deg' }],
    resizeMode: 'contain',
    zIndex: 1,
  },
  pulsefitText: {
    fontFamily: 'Kadwa-Bold',
    fontWeight: '500',
    color: '#fff',
    zIndex: 2,
    includeFontPadding: false,
    textAlignVertical: 'top',
  },
  fitText: {
    color: '#03971bff', // Brighter Green (Edit this hex code to pick your own color!)
    fontFamily: 'Kadwa-Bold',
    fontWeight: '500',
  },
});
