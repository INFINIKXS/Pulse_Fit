import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

import googleIcon from '../assets/images/google-icon.png';
import appleIcon from '../assets/images/apple-icon.png';

interface SocialLoginRowProps {
  onGooglePress?: () => void;
  onApplePress?: () => void;
  style?: ViewStyle | ViewStyle[];
  googleButtonStyle?: ViewStyle | ViewStyle[];
  appleButtonStyle?: ViewStyle | ViewStyle[];
  googleText?: string;
  appleText?: string;
  googleTextStyle?: TextStyle | TextStyle[];
  appleTextStyle?: TextStyle | TextStyle[];
  googleIconStyle?: ImageStyle | ImageStyle[];
  appleIconStyle?: ImageStyle | ImageStyle[];
}

export default function SocialLoginRow({
  onGooglePress,
  onApplePress,
  style,
  googleButtonStyle,
  appleButtonStyle,
  googleText = 'Google',
  appleText = 'Apple',
  googleTextStyle,
  appleTextStyle,
  googleIconStyle,
  appleIconStyle,
}: SocialLoginRowProps) {
  return (
    <View style={[styles.socialRow, style]}>
      <TouchableOpacity style={[styles.googleButton, googleButtonStyle]} onPress={onGooglePress}>
        <Image source={googleIcon} style={[styles.socialIcon, googleIconStyle]} />
        <Text style={[styles.googleText, googleTextStyle]}>{googleText}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.appleButton, appleButtonStyle]} onPress={onApplePress}>
        <Image source={appleIcon} style={[styles.appleIcon, appleIconStyle]} />
        <Text style={[styles.appleText, appleTextStyle]}>{appleText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 353,
    height: 52,
    zIndex: 2,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 135,
    height: 52,
    borderRadius: 23,
    backgroundColor: 'rgba(255,255,255,0.4)',
    opacity: 1,
    marginRight: 20,
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 135,
    height: 52,
    borderRadius: 23,
    backgroundColor: 'rgba(255,255,255,0.4)',
    opacity: 1,
  },
  socialIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
    tintColor: undefined,
  },
  appleIcon: {
    width: 45,
    height: 45,
    marginRight: 0,
    right: 11,
  },
  googleText: {
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 19,
    letterSpacing: 0,
    color: '#000',
    fontFamily: 'FamiljenGrotesk-Regular',
  },
 appleText: {
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 19,
    letterSpacing: 0,
    color: '#000',
    fontFamily: 'FamiljenGrotesk-Regular',
    right: 11
  },
});
