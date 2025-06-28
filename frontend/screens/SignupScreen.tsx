import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import bgImage from '../assets/images/cc3cfeee16ef7cccd3db0ae8cc3a8c1de31fa905.jpg';
import logo from '../assets/images/pulsefit-logo.png';
import googleIcon from '../assets/images/google-icon.png';
import appleIcon from '../assets/images/apple-icon.png';

const { width, height } = Dimensions.get('window');

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
          style={styles.input}
          placeholder="Create Password"
          placeholderTextColor="#bbb"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
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
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={googleIcon} style={styles.socialIcon} />
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={appleIcon} style={styles.socialIcon} />
            <Text style={styles.socialText}>Apple</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>Log In</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#000',
  },
  backgroundImage: {
    position: 'absolute',
    width: width,
    height: height,
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 60,
    marginBottom: 10,
    marginTop: 30,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 20,
    marginLeft: 10,
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 20,
    color: '#fff',
    marginBottom: 15,
    fontSize: 16,
  },
  signupButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#00D100',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 15,
  },
  signupButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  orText: {
    color: '#fff',
    marginVertical: 10,
    fontSize: 15,
    textAlign: 'center',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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
  socialIcon: {
    width: 22,
    height: 22,
    marginRight: 8,
  },
  socialText: {
    color: '#222',
    fontWeight: '600',
    fontSize: 15,
  },
  loginText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  loginLink: {
    color: '#00D100',
    fontWeight: 'bold',
  },
});
