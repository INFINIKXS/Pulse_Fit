import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface AuthRedirectLinkProps {
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
  textBefore?: string;
  linkText?: string;
  textStyle?: TextStyle | TextStyle[];
  linkStyle?: TextStyle | TextStyle[];
}

export default function AuthRedirectLink({
  onPress,
  style,
  textBefore = 'Already have an account? ',
  linkText = 'Log In',
  textStyle,
  linkStyle,
}: AuthRedirectLinkProps) {
  return (
    <Text style={[styles.footerText, textStyle, style]}>
      {textBefore}
      <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={{ padding: 0, margin: 0 }}>
        <Text style={[styles.footerLink, linkStyle]}>{linkText}</Text>
      </TouchableOpacity>
    </Text>
  );
}

const styles = StyleSheet.create({
  footerText: {
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 15,
    letterSpacing: 0,
    color: '#fff',
    textAlign: 'center',
    width: 307,
    height: 20,
    includeFontPadding: false,
    textAlignVertical: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'FamiljenGrotesk-Regular',
  },
  footerLink: {
    fontWeight: '500',
    color: '#00FF00',
    fontFamily: 'FamiljenGrotesk-Bold',
    padding: 0,
    margin: 7,
    height: 30,
    width: 60,
    left: -8,
  },
});
