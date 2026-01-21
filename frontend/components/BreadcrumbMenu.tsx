import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

const editableLine = require('../assets/images/Editable-line.png');

interface BreadcrumbMenuProps {
  onPress?: () => void;
}

export default function BreadcrumbMenu({ onPress }: BreadcrumbMenuProps) {
  return (
    <TouchableOpacity style={styles.menuWrap} onPress={onPress}>
      <Image source={editableLine} style={styles.lineImage} resizeMode="contain" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32, // Match layout width
    height: 32, // Match layout height
    // Removed background/padding if it's just the icon, or keeping it if it's a wrapper.
    // Assuming wrapper is not needed if the image is the component.
    // But keeping empty wrapper for positioning if needed, or transparent.
  },
  lineImage: {
    width: 32,
    height: 32,
  }
});
