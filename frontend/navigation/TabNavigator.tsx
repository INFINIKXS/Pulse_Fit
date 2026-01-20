import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import ActivitiesScreen from '../screens/ActivitiesScreen';
import WorkoutsScreen from '../screens/WorkoutsScreen';
import ProgressScreen from '../screens/ProgressScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: '#00FF00',
                tabBarInactiveTintColor: '#666666',
                tabBarShowLabel: true,
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontFamily: 'FamiljenGrotesk-Regular',
                    marginBottom: 4,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        return <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />;
                    } else if (route.name === 'Activities') {
                        return <Ionicons name={focused ? "walk" : "walk-outline"} size={24} color={color} />;
                    } else if (route.name === 'Workouts') {
                        return <MaterialCommunityIcons name={focused ? "dumbbell" : "dumbbell"} size={24} color={color} />;
                    } else if (route.name === 'Progress') {
                        return <Ionicons name={focused ? "stats-chart" : "stats-chart-outline"} size={24} color={color} />;
                    } else if (route.name === 'Profile') {
                        return <Ionicons name={focused ? "person" : "person-outline"} size={24} color={color} />;
                    }
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Activities" component={ActivitiesScreen} />
            <Tab.Screen name="Workouts" component={WorkoutsScreen} />
            <Tab.Screen name="Progress" component={ProgressScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#000000',
        borderTopWidth: 0,
        height: 60,
        paddingBottom: 8,
        paddingTop: 8,
        elevation: 0,
        shadowOpacity: 0,
    }
});
