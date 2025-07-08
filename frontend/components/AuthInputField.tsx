import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface AuthInputFieldProps extends TextInputProps {
  // Removed top/left; parent controls position
}

export default function AuthInputField({ style, ...props }: AuthInputFieldProps) {
  // Remove all position logic from the component; parent controls position
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={props.placeholderTextColor || 'rgba(0,0,0,0.5)'}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: 325,
    height: 53,
    borderRadius: 20,
    paddingHorizontal: 20,
    color: '#FFFFFF',
    fontSize: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    fontFamily: 'FamiljenGrotesk-Regular',
    fontWeight: '500',
    opacity: 1,
    marginBottom: 15,
  },
});
