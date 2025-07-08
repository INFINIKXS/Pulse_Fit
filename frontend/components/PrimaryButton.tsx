import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
  textStyle?: any;
}

export default function PrimaryButton({ title, style, textStyle, ...props }: PrimaryButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} {...props}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 325,
    height: 58,
    backgroundColor: '#00B300',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 15,
  },
  buttonText: {
    color: '#000',
    fontWeight: '500',
    fontSize: 18,
    fontFamily: 'FamiljenGrotesk-Bold',
  },
});
