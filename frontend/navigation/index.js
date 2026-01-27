// navigation/index.js
// Example stack navigator setup for React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import OnboardingScreen1 from '../screens/OnboardingScreen1';
import OnboardingScreen2 from '../screens/OnboardingScreen2';
import TabNavigator from './TabNavigator';

import SplashScreen from '../screens/SplashScreen';

const Stack = createStackNavigator();



export default function AppNavigator() {
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    // Return the splash screen component directly while checking auth state 
    // Note: SplashScreen won't have navigation prop here but its animation runs
    // We modify SplashScreen slightly to handle this case gracefully or just return it without props
    return <SplashScreen navigation={{ replace: () => { } }} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken == null ? (
          // No token found, user isn't signed in
          <>
            <Stack.Screen name="Login" component={LoginScreen} animationTypeForReplace="pop" />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : (
          // User is signed in
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="Onboarding1" component={OnboardingScreen1} />
            <Stack.Screen name="OnboardingScreen2" component={OnboardingScreen2} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
