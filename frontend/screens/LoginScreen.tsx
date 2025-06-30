import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Assume these assets are in the correct path
import bgImage from '../assets/images/dumbbells-bg.jpg';
import logo from '../assets/images/pulsefit-logo.png';
import googleIcon from '../assets/images/google-icon.png';
import appleIcon from '../assets/images/apple-icon.png';

// Define the navigation type for better type safety
// Adjust RootStackParamList as per your navigation setup
type RootStackParamList = {
  Signup: undefined;
  Login: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Add timer-based handlers for visible dim effect
  const handleResetPress = () => {
    setTimeout(() => {
      // TODO: Add reset password navigation
    }, 0);
  };
  const handleSignupPress = () => {
    setTimeout(() => {
      navigation.navigate('Signup');
    }, 0);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <View style={styles.roundedClip}>
        <Image source={bgImage} style={styles.backgroundImage} />
        <View style={styles.overlay} />
        <View style={styles.content}>
          {/* Logo */}
          <Image source={logo} style={styles.logo} resizeMode="contain" />

          {/* Title */}
          <Text style={styles.title}>Log In</Text>

          {/* Email Label */}
          <Text style={styles.labelEmail}>Email</Text>
          <TextInput
            style={[styles.input, { top: 238, fontFamily: 'FamiljenGrotesk-Bold', fontWeight: '500', fontSize: 15 }]}
            placeholder="Email"
            placeholderTextColor="rgba(0,0,0,0.5)"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Password Label */}
          <Text style={styles.labelPassword}>Password</Text>
          <TextInput
            style={[styles.input, { top: 328, fontFamily: 'FamiljenGrotesk-Bold', fontWeight: '500', fontSize: 15 }]}
            placeholder="Password"
            placeholderTextColor="rgba(0,0,0,0.5)"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>

          {/* Divider */}
          <Text style={styles.orText}>Or</Text>
          <View style={styles.dividerLineLeft} />
          <View style={styles.dividerLineRight} />

          {/* Social Buttons */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialButton}>
              <Image source={googleIcon} style={styles.socialIcon} />
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButton, { marginTop: 16 }]}> 
              <Image source={appleIcon} style={styles.appleIcon} />
              <Text style={styles.socialButtonText}>Continue with Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Links */}
          <Text style={[styles.footerText, { top: 649, left:95 }]}>Forgot password?{' '}
            <TouchableOpacity activeOpacity={0.5} onPress={handleResetPress} style={{padding: 0, margin: 0}}>
              <Text style={[styles.footerLink, {padding: 0, margin: 0, height: 30, width: 60, top: 17, fontWeight: '500', fontFamily: 'FamiljenGrotesk-Bold'}]}>Reset</Text>
            </TouchableOpacity>
          </Text>
          <Text style={[styles.footerText, { top: 690, left:66 }]}>Don't have an account?{' '}
            <TouchableOpacity activeOpacity={0.5} onPress={handleSignupPress} style={{padding: 0, margin: 0}}>
              <Text style={[styles.footerLink, {padding: 0, margin: 0, height: 30, width: 60, top: 17, fontWeight: '500', fontFamily: 'FamiljenGrotesk-Bold'}]}>Sign Up</Text>
            </TouchableOpacity>
          </Text>

          {/* Brand Text */}
          <Text
            style={{
              position: 'absolute',
              top: 90,
              left: 95,
              width: 200,
              height: 78,
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
            }}
          >
            {'Pulse'}
            <Text style={{ color: '#008000', fontFamily: 'Kadwa-Bold', fontWeight: '500' }}>{'FIT'}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  roundedClip: {
    flex: 1,
    borderRadius: 40,
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 24,
  },
  logo: {
    width: 191.42,
    height: 94.75,
    position: 'absolute',
    top: 62,
    left: 22,
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '500', // Make title bold
    fontFamily: 'FamiljenGrotesk-Bold', // Use bold variant
    alignSelf: 'flex-start',
    position: 'absolute',
    top: 164,
    left: 22,
    width: 150,
    height: 36,
    lineHeight: 25,
    letterSpacing: 0,
  },
  labelEmail: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'FamiljenGrotesk-Bold',
    position: 'absolute',
    top: 210,
    left: 24,
  },
  labelPassword: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'FamiljenGrotesk-Bold',
    position: 'absolute',
    top: 302,
    left: 24,
  },
  input: {
    width: '100%',
    height: 53,
    borderRadius: 20,
    paddingHorizontal: 20,
    color: '#FFFFFF',
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.35)', // Match social button background
    position: 'absolute',
    alignSelf: 'center',
    fontFamily: 'FamiljenGrotesk-Regular',
    // Remove fixed top here, control with style prop in component
  },
  inputPassword: {
    width: '100%',
    height: 56,
    borderRadius: 20,
    paddingHorizontal: 20,
    color: '#FFFFFF',
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.35)', // Match social button background
    position: 'absolute',
    alignSelf: 'center',
    fontFamily: 'FamiljenGrotesk-Regular',
    // Remove fixed top here, control with style prop in component
  },
  loginButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#00B300', // Darker green
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 400,
    alignSelf: 'center',
  },
  loginButtonText: {
    color: '#000000',
    fontWeight: '500',
    fontSize: 18,
    fontFamily: 'FamiljenGrotesk-Bold',
  },
  orText: {
    color: '#fff',
    position: 'absolute',
    top: 480,
    alignSelf: 'center',
    fontFamily: 'FamiljenGrotesk-Bold',
    fontWeight: '500',
    fontSize: 16,
  },
  dividerLineLeft: {
    position: 'absolute',
    top: 492,
    left:25,
    width: '45%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  dividerLineRight: {
    position: 'absolute',
    top: 492,
    right: 25,
    width: '45%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  socialRow: {
    position: 'absolute',
    top: 524,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  socialButton: {
    width: '100%',
    height: 56,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    alignSelf: 'center',
  },
  socialIcon: {
    width: 30,
    height: 30,
    marginRight: 12,
    right: 25, // Adjusted to match the new layout
  },
  appleIcon: {
    width: 45, // bigger than google icon
    height: 45,
    marginRight: 5,
    right: 28,
  },
  socialButtonText: {
    color: '#000000', // Black text
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'FamiljenGrotesk-Regular',
    right: 25,
  },
  footerText: {
    fontWeight: '100',
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    position: 'absolute',
    top: 730,
    alignSelf: 'center',
    fontFamily: 'FamiljenGrotesk-Regular',
  },
  footerLink: {
    fontWeight: '500',
    color: '#00FF00',
    fontFamily: 'FamiljenGrotesk-Bikd',
  },
  footerLinkPressed: {
    opacity: 0.5,
  },
});
