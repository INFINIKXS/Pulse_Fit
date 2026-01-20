import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import logo from '../assets/images/pulsefit-logo.png';

export default function PulseFit_Logo({ style }: { style?: any }) {
  return (
    <View style={[styles.container, style]}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.pulsefitText}>
        {'Pulse'}
        <Text style={styles.fitText}>{'FIT'}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 191.42,
    height: 94.75,
    position: 'absolute',
    top: -3,
    left: 32,
    marginBottom: 1,
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
    left: 122,
    top: 26,

  },
  fitText: {
    color: '#008000',
    fontFamily: 'Kadwa-Bold',
    fontWeight: '500',
  },
});
