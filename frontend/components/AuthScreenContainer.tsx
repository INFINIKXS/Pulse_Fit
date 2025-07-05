import React from 'react';
import { View, Image, StyleSheet, SafeAreaView } from 'react-native';
import bgImage from '../assets/images/dumbbells-bg.jpg';

interface AuthScreenContainerProps {
  children: React.ReactNode;
}

export default function AuthScreenContainer({ children }: AuthScreenContainerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.roundedClip}>
        <Image source={bgImage} style={styles.backgroundImage} />
        <View style={styles.overlay} />
        <SafeAreaView>{children}</SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  roundedClip: {
    width: 393,
    height: 852,
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: '#000',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  backgroundImage: {
    position: 'absolute',
    width: 393,
    height: 852,
    top: 0,
    left: 0,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  // safeArea: { flex: 1 },
});
