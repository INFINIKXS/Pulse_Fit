import React from 'react';
import { Image, ImageStyle } from 'react-native';
import logo from '../assets/images/pulsefit-logo.png';

interface AppLogoProps {
  style?: ImageStyle | ImageStyle[];
}

export default function AppLogo({ style }: AppLogoProps) {
  // Remove default absolute positioning so parent can control it
  return <Image source={logo} style={style} resizeMode="contain" />;
}
