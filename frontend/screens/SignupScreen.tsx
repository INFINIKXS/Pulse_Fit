import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

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
      <View style={styles.roundedClip}>
        <Image source={bgImage} style={styles.backgroundImage} />
        <View style={styles.overlay} />
        <View style={styles.content}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#bbb"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.inputPassword}
            placeholder="Create Password"
            placeholderTextColor="#bbb"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.inputConfirm}
            placeholder="Confirm Password"
            placeholderTextColor="#bbb"
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
          <Text style={styles.loginText}>
            Already have an account?{' '}
            <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>Log In</Text>
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
    left: 101,
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '700',
    alignSelf: 'flex-start',
    fontFamily: 'Familjen Grotesk',
    position: 'absolute',
    top: 189,
    left: 30,
    width: 99,
    height: 31,
    lineHeight: 25,
    letterSpacing: 0,
  },
  input: {
    width: 353,
    height: 52,
    borderRadius: 20,
    paddingHorizontal: 20,
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'rgba(255,255,255,0.4)',
    position: 'absolute',
    top: 241,
    left: 20,
    opacity: 0.4,
    marginBottom: 15,
  },
  inputPassword: {
    width: 353,
    height: 52,
    borderRadius: 20,
    paddingHorizontal: 20,
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'rgba(255,255,255,0.4)',
    position: 'absolute',
    top: 308,
    left: 20,
    opacity: 0.4,
    marginBottom: 15,
  },
  inputConfirm: {
    width: 353,
    height: 52,
    borderRadius: 20,
    paddingHorizontal: 20,
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'rgba(255,255,255,0.4)',
    position: 'absolute',
    top: 377,
    left: 20,
    opacity: 0.4,
    marginBottom: 15,
  },
  signupButton: {
    width: 353,
    height: 52,
    backgroundColor: '#00D100',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 464,
    left: 20,
    marginTop: 0,
    marginBottom: 15,
  },
  signupButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  orText: {
    width: 200,
    height: 20,
    position: 'absolute',
    top: 552,
    left: 98,
    fontFamily: 'Familjen Grotesk',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0,
    color: '#fff',
    textAlign: 'center',
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
    backgroundColor: '#eee',
    opacity: 0.5,
    marginRight: 20,
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 135,
    height: 52,
    borderRadius: 23,
    backgroundColor: '#eee',
    opacity: 0.5,
  },
  socialIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  appleIcon: {
    width: 40, // bigger than google icon
    height: 40,
    marginRight: 5,
  },
  googleText: {
    fontFamily: 'Familjen Grotesk',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 19,
    letterSpacing: 0,
    color: 'black',
  },
  appleText: {
    fontFamily: 'Familjen Grotesk',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 19,
    letterSpacing: 0,
    color: '#000',
  },
  socialText: {
    color: '#222',
    fontWeight: '600',
    fontSize: 15,
  },
  loginText: {
    fontFamily: 'Familjen Grotesk',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 15,
    letterSpacing: 0,
    color: '#fff',
    textAlign: 'center',
    width: 307,
    height: 19,
    position: 'absolute',
    top: 678,
    left: 40,
    includeFontPadding: false,
    textAlignVertical: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginLink: {
    fontFamily: 'Familjen Grotesk',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 15,
    letterSpacing: 0,
    color: '#00D100',
    textAlign: 'center',
  },
});
