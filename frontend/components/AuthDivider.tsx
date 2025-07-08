import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface AuthDividerProps {
  dividerText?: string;
  style?: ViewStyle | ViewStyle[];
  leftLineStyle?: ViewStyle | ViewStyle[];
  rightLineStyle?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
}

export default function AuthDivider({
  dividerText = 'Or continue with',
  style,
  leftLineStyle,
  rightLineStyle,
  textStyle,
}: AuthDividerProps) {
  return (
    <View style={style}>
      <Text style={[styles.orText, textStyle]}>{dividerText}</Text>
      <View style={[styles.dividerLeft, leftLineStyle]} />
      <View style={[styles.dividerRight, rightLineStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  orText: {
    width: 200,
    height: 20,
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'FamiljenGrotesk-Bold',
  },
  dividerLeft: {
    width: 105,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    alignSelf: 'center',
  },
  dividerRight: {
    width: 105,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    alignSelf: 'center',
  },
});
