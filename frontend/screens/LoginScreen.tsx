import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthScreenContainer from '../components/AuthScreenContainer';
import PulseFit_Logo from '../components/PulseFit_Logo';
import AuthInputField from '../components/AuthInputField';
import PrimaryButton from '../components/PrimaryButton';



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

  // Handler for reset password (placeholder)
  const handleResetPress = () => {
    // TODO: Add reset password navigation
  };

  return (
    <AuthScreenContainer>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <View style={{ flex: 1, width: '100%', paddingHorizontal: 20, position: 'relative' }}>
        <View style={{ position: 'absolute', top: 79 }}>
          <PulseFit_Logo />
        </View>
        {/* Title */}
        <Text style={{
          position: 'absolute',
          top: 164,
          left: 22, // unchanged (title is excluded)
          width: 150,
          height: 36,
          color: '#fff',
          fontSize: 25,
          fontWeight: '500',
          fontFamily: 'FamiljenGrotesk-Bold',
          alignSelf: 'flex-start',
          lineHeight: 25,
          letterSpacing: 0,
          textAlign: 'left',
        }}>
          Log In
        </Text>
        {/* Email Label */}
        <Text style={{
          position: 'absolute',
          top: 210,
          left: 19,
          color: '#FFFFFF',
          fontSize: 16,
          fontWeight: '500',
          fontFamily: 'FamiljenGrotesk-Bold',
        }}>
          Email
        </Text>
        <AuthInputField
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{ position: 'absolute', top: 238, left: 19, right: 29, height: 53, borderRadius: 20, paddingHorizontal: 20 }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {/* Password Label */}
        <Text style={{
          position: 'absolute',
          top: 302,
          left: 19,
          color: '#FFFFFF',
          fontSize: 16,
          fontWeight: '500',
          fontFamily: 'FamiljenGrotesk-Bold',
        }}>
          Password
        </Text>
        <AuthInputField
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={{ position: 'absolute', top: 328, left: 19, right: 29, height: 56, borderRadius: 20, paddingHorizontal: 20 }}
          autoCapitalize="none"
        />
        <PrimaryButton
          title="Log In"
          onPress={() => {}}
          style={{ position: 'absolute', top: 400, left: 19, right: 29, height: 56, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}
        />
        {/* Divider */}
        <Text style={{
          position: 'absolute',
          top: 480,
          left: 170,
          color: '#fff',
          fontFamily: 'FamiljenGrotesk-Bold',
          fontWeight: '500',
          fontSize: 16,
        }}>Or</Text>
        <View style={{ position: 'absolute', top: 492, left: 19, width: 140, height: 1.5, backgroundColor: '#FFFFFF', opacity: 0.7, borderRadius: 1 }} />
        <View style={{ position: 'absolute', top: 492, right: 49, width: 140, height: 1.5, backgroundColor: '#FFFFFF', opacity: 0.7, borderRadius: 1 }} />
        <View style={{ position: 'absolute', top: 524, left: 19, width: 353, height: 128, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column' }}>
          <TouchableOpacity style={{ right: 10, width: 323, height: 56, borderRadius: 20, backgroundColor: 'rgba(255, 255, 255, 0.35)', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 0, paddingLeft: 18 }}>
            <Image source={require('../assets/images/google-icon.png')} style={{ width: 30, height: 30, marginRight: 105, marginLeft: 0 }} />
            <Text style={{ right: 88,color: '#000000', fontSize: 14, fontWeight: '600', fontFamily: 'FamiljenGrotesk-Regular' }}>Continue with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ right: 10, width: 323, height: 56, borderRadius: 20, backgroundColor: 'rgba(255, 255, 255, 0.35)', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16, marginBottom: 0, paddingLeft: 8 }}>
            <Image source={require('../assets/images/apple-icon.png')} style={{ width: 36, height: 36, marginRight: 88, marginLeft: 1 }} />
            <Text style={{right:78, color: '#000000', fontSize: 14, fontWeight: '600', fontFamily: 'FamiljenGrotesk-Regular' }}>Continue with Apple</Text>
          </TouchableOpacity>
        </View>
        {/* Footer links - pixel-perfect, centered, flex row */}
        <View style={{ position: 'absolute', top: 665, left: 0, right: 0, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
          <Text style={{ fontWeight: '100', fontSize: 14, color: '#FFFFFF', fontFamily: 'FamiljenGrotesk-Regular', textAlign: 'center', padding: 0, margin: 0 }}>Forgot password? </Text>
          <TouchableOpacity activeOpacity={0.5} onPress={handleResetPress} style={{ padding: 0, margin: 0, height: 30, justifyContent: 'center' }}>
            <Text style={{ fontWeight: '500', color: '#00FF00', fontFamily: 'FamiljenGrotesk-Bold', fontSize: 14, padding: 0, margin: 0 }}>Reset</Text>
          </TouchableOpacity>
        </View>
        <View style={{ position: 'absolute', top: 705, left: 0, right: 0, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
          <Text style={{ fontWeight: '100', fontSize: 14, color: '#FFFFFF', fontFamily: 'FamiljenGrotesk-Regular', textAlign: 'center', padding: 0, margin: 0 }}>Don't have an account? </Text>
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Signup')} style={{ padding: 0, margin: 0, height: 30, justifyContent: 'center' }}>
            <Text style={{ fontWeight: '500', color: '#00FF00', fontFamily: 'FamiljenGrotesk-Bold', fontSize: 14, padding: 0, margin: 0 }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        {/* PulseFit_Logo now handles the logo and text */}
      </View>
    </AuthScreenContainer>
  );
}
