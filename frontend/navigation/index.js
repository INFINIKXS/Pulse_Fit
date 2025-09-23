// navigation/index.js
// Example stack navigator setup for React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import OnboardingScreen1 from '../screens/OnboardingScreen1';
import OnboardingScreen2 from '../screens/OnboardingScreen2';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboarding1"
          component={OnboardingScreen1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnboardingScreen2"
          component={OnboardingScreen2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
