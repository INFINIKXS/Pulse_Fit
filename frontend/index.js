import { View, Text } from 'react-native';
import { registerRootComponent } from 'expo';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AppNavigator from './navigation';
import { AuthProvider } from './context/AuthContext';
import React from 'react';

function App() {
  // Enable font loading for Familjen Grotesk and Kadwa variants
  const [fontsLoaded] = useFonts({
    'FamiljenGrotesk-Regular': require('./assets/fonts/Familjen/static/FamiljenGrotesk-Regular.ttf'),
    'FamiljenGrotesk-Bold': require('./assets/fonts/Familjen/static/FamiljenGrotesk-Bold.ttf'),
    'FamiljenGrotesk-Italic': require('./assets/fonts/Familjen/static/FamiljenGrotesk-Italic.ttf'),
    'FamiljenGrotesk-BoldItalic': require('./assets/fonts/Familjen/static/FamiljenGrotesk-BoldItalic.ttf'),
    'FamiljenGrotesk-Medium': require('./assets/fonts/Familjen/static/FamiljenGrotesk-Medium.ttf'),
    'FamiljenGrotesk-MediumItalic': require('./assets/fonts/Familjen/static/FamiljenGrotesk-MediumItalic.ttf'),
    'FamiljenGrotesk-SemiBold': require('./assets/fonts/Familjen/static/FamiljenGrotesk-SemiBold.ttf'),
    'FamiljenGrotesk-SemiBoldItalic': require('./assets/fonts/Familjen/static/FamiljenGrotesk-SemiBoldItalic.ttf'),
    // Kadwa font variants
    'Kadwa-Regular': require('./assets/fonts/Kadwa/Kadwa-Regular.ttf'),
    'Kadwa-Bold': require('./assets/fonts/Kadwa/Kadwa-Bold.ttf'),
  });

  React.useEffect(() => {
    // Prevent auto hide on mount
    SplashScreen.preventAutoHideAsync().catch(console.warn);
  }, []);

  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(console.warn);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
        <Text style={{ fontSize: 20, color: 'black' }}>Loading Fonts...</Text>
      </View>
    );
  }

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

registerRootComponent(App);
