import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AuthInputField from '../components/AuthInputField';
import PrimaryButton from '../components/PrimaryButton';
import SocialLoginRow from '../components/SocialLoginRow';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import bgImage from '../assets/images/auth-bg.jpg';
// import logo from '../assets/images/pulsefit-logo.png';
import PulseFit_Logo from '../components/PulseFit_Logo';
// import googleIcon from '../assets/images/google-icon.png';
// import appleIcon from '../assets/images/apple-icon.png';

// Define the navigation type for better type safety
// Adjust RootStackParamList as per your navigation setup
type RootStackParamList = {
  Signup: undefined;
  Login: undefined;
  Onboarding1: undefined;
};

import { AuthContext } from '../context/AuthContext';
import { Alert, ActivityIndicator } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

export default function SignupScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signUp } = React.useContext(AuthContext)!;
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await signUp({ email, password, full_name: 'User' }); // Default name, update later
      navigation.navigate('Onboarding1');
    } catch (error: any) {
      // Handle validation errors from backend
      const errorMessage = error.response?.data?.error?.message
        || error.response?.data?.error?.details?.[0]?.msg
        || error.response?.data?.error
        || 'Something went wrong';
      Alert.alert('Signup Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <View style={styles.roundedClip}>
        <Image source={bgImage} style={styles.backgroundImage} />
        <View style={styles.overlay} />
        <View style={styles.content}>
          <PulseFit_Logo />
          <Text style={styles.title}>Sign Up</Text>
          <AuthInputField
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
          />
          <AuthInputField
            placeholder="Create Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.inputPassword}
          />
          <AuthInputField
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.inputConfirm}
          />
          {loading ? (
            <ActivityIndicator size="large" color="#00FF00" style={{ position: 'absolute', top: 480, alignSelf: 'center' }} />
          ) : (
            <PrimaryButton
              title="Sign Up"
              style={styles.signupButton}
              // textStyle={styles.signupButtonText} // Removed: style does not exist, see TS error
              onPress={handleSignup}
            />
          )}
          <Text style={styles.orText}>Or continue with</Text>
          <View style={{
            position: 'absolute',
            top: 562,
            left: 39,
            width: 85,
            borderBottomWidth: 1,
            borderBottomColor: '#fff',
            alignSelf: 'center',
          }} />
          <View style={{
            position: 'absolute',
            top: 562,
            left: 270,
            width: 85,
            borderBottomWidth: 1,
            borderBottomColor: '#fff',
            alignSelf: 'center',
          }} />
          <SocialLoginRow
            style={styles.socialRow}
            onGooglePress={() => { }}
            onApplePress={() => { }}
          />
          {/* Footer Link */}
          <Text style={[styles.footerText, { left: 54 }]}>
            Already have an account?{' '}
            <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Login')} style={{ padding: 0, margin: 0 }}>
              <Text style={[styles.footerLink, { padding: 0, margin: 7, height: 30, width: 60, left: -8 }]}>Log In</Text>
            </TouchableOpacity>
          </Text>
          {/* PulseFit_Logo now handles the logo and text */}
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
    position: 'absolute',
    top: 241,
    left: 33,
  },
  inputPassword: {
    position: 'absolute',
    top: 308,
    left: 33,
  },
  inputConfirm: {
    position: 'absolute',
    top: 377,
    left: 33,
  },
  signupButton: {
    position: 'absolute',
    top: 464,
    left: 33,
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
    position: 'absolute',
    top: 600,
    left: 20,
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
