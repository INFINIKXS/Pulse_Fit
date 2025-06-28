import React from 'react';
import { AppRegistry } from 'react-native';
import AppNavigator from './navigation';
import { name as appName } from './app.json';

function App() {
  return <AppNavigator />;
}

AppRegistry.registerComponent(appName, () => App);
