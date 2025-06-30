import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import bgImage from '../assets/images/auth-bg.jpg';
import logo from '../assets/images/pulsefit-logo.png';
import googleIcon from '../assets/images/google-icon.png';
import appleIcon from '../assets/images/apple-icon.png';

// Define the navigation type for better type safety
// Adjust RootStackParamList as per your navigation setup
type RootStackParamList = {
  Signup: undefined;
  Login: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

export default function SignupScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <View style={styles.roundedClip}>
        <Image source={bgImage} style={styles.backgroundImage} />
        <View style={styles.overlay} />
        <View style={styles.content}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="rgba(0,0,0,0.5)"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.inputPassword}
            placeholder="Create Password"
            placeholderTextColor="rgba(0,0,0,0.5)"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.inputConfirm}
            placeholder="Confirm Password"
            placeholderTextColor="rgba(0,0,0,0.5)"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
          <Text style={styles.orText}>Or continue with</Text>
          <View style={{
            position: 'absolute',
            top: 562,
            left: 20,
            width: 105,
            borderBottomWidth: 1,
            borderBottomColor: '#fff',
            alignSelf: 'center',
          }} />
          <View style={{
            position: 'absolute',
            top: 562,
            left: 268,
            width: 105,
            borderBottomWidth: 1,
            borderBottomColor: '#fff',
            alignSelf: 'center',
          }} />
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.googleButton}>
              <Image source={googleIcon} style={styles.socialIcon} />
              <Text style={styles.googleText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.appleButton}>
              <Image source={appleIcon} style={styles.appleIcon} />
              <Text style={styles.appleText}>Apple</Text>
            </TouchableOpacity>
          </View>
          {/* Footer Link */}
          <Text style={[styles.footerText, {left: 54}]}>
            Already have an account?{' '}
            <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Login')} style={{padding: 0, margin: 0}}>
              <Text style={[styles.footerLink, {padding: 0, margin: 7, height: 30, width: 60, left: -8}]}>Log In</Text>
            </TouchableOpacity>
          </Text>
          <Text
            style={{
              position: 'absolute',
              top: 125.86,
              left: 125.42,
              width: 200,
              height: 78,
              fontFamily: 'Kadwa-Bold', // Use Kadwa Regular
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
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundedClip: {
    width: 393,
    height: 852,
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 98, // match design top offset for logo
    position: 'relative', // Ensure absolute children are positioned relative to this
  },
  logo: {
    width: 191.42,
    height: 94.75,
    position: 'absolute',
    top: 98,
    left: 51,
    marginBottom: 10,
  
  },
  title: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '500', // Make title bold
    fontFamily: 'FamiljenGrotesk-Bold', // Use bold variant
    alignSelf: 'flex-start',
    position: 'absolute',
    top: 189,
    left: 30,
    width: 150,
    height: 36,
    lineHeight: 25,
    letterSpacing: 0,
  },
  input: {
    width: 325,
    height: 53,
    borderRadius: 20,
    paddingHorizontal: 20,
    color: '#000000',
    fontSize: 14,
    backgroundColor: 'rgba(255,255,255,0.43)', // set to 0.43 opacity
    position: 'absolute',
    top: 241,
    left: 33,
    opacity: 1,
    marginBottom: 15,
    fontFamily: 'FamiljenGrotesk-Regular',
  },
  inputPassword: {
    width: 325,
    height: 53,
    borderRadius: 20,
    paddingHorizontal: 20,
    color: '#000000',
    fontSize: 14,
    backgroundColor: 'rgba(255,255,255,0.43)', // set to 0.43 opacity
    position: 'absolute',
    top: 308,
    left: 33,
    opacity: 1,
    marginBottom: 15,
    fontFamily: 'FamiljenGrotesk-Regular',
  },
  inputConfirm: {
    width: 325,
    height: 53,
    borderRadius: 20,
    paddingHorizontal: 20,
    color: '#000000',
    fontSize: 14,
    backgroundColor: 'rgba(255,255,255,0.43)', // set to 0.43 opacity
    position: 'absolute',
    top: 377,
    left: 33,
    opacity: 1,
    marginBottom: 15,
    fontFamily: 'FamiljenGrotesk-Regular',
  },
  signupButton: {
    width: 325,
    height: 58,
    backgroundColor: '#00B300', // Darker green
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 464,
    left: 33,
    marginTop: 0,
    marginBottom: 15,
  },
  signupButtonText: {
    color: '#000', // Use pure black for maximum contrast
    fontWeight: '500',
    fontSize: 18,
    fontFamily: 'FamiljenGrotesk-Bold', // Use bold variant
  },
  orText: {
    width: 200,
    height: 20,
    position: 'absolute',
    top: 552,
    left: 98,
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'FamiljenGrotesk-Bold',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 600,
    left: 20,
    width: 353,
    height: 52,
    zIndex: 2,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 135,
    height: 52,
    borderRadius: 23,
    backgroundColor: 'rgba(255,255,255,0.4)', // match email input box
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
    backgroundColor: 'rgba(255,255,255,0.4)', // match email input box
    opacity: 1,
  },
  socialIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
    tintColor: undefined, // Google icon should keep its color
  },
  appleIcon: {
    width: 45, // bigger than google icon
    height: 45,
    marginRight: 0,
    right:11
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
  loginText: {
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 8,
    letterSpacing: 0,
    color: '#fff',
    textAlign: 'center',
    width: 307,
    height: 20,
    position: 'absolute',
    top: 678,
    left: 42,
    includeFontPadding: false,
    textAlignVertical: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'FamiljenGrotesk-Regular',
  },
  footerText: {
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 15,
    letterSpacing: 0,
    color: '#fff',
    textAlign: 'center',
    width: 307,
    height: 20,
    position: 'absolute',
    top: 678,
    left: 46,
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
  },
  footerLinkPressed: {
    opacity: 0.5,
  },
});
