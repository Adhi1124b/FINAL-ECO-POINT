import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import Screens
import DashboardScreen from './DashboardScreen';
import ProjectsScreen from './ProjectsScreen';
import ActivityScreen from './ActivityScreen';
import SettingsScreen from './SettingsScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#ffffff',
                    borderTopWidth: 0,
                    elevation: 10,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    height: Platform.OS === 'android' ? 60 : 80,
                    paddingBottom: Platform.OS === 'android' ? 10 : 20,
                    paddingTop: 10,
                },
                tabBarActiveTintColor: '#1E8E3E', // Eco Green
                tabBarInactiveTintColor: '#95A5A6', // Gray
                tabBarLabelStyle: {
                    fontWeight: '600',
                    fontSize: 12,
                    marginTop: 4,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Dashboard') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Projects') {
                        iconName = focused ? 'leaf' : 'leaf-outline';
                    } else if (route.name === 'Activity') {
                        iconName = focused ? 'bicycle' : 'bicycle-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                    tabBarLabel: 'Home'
                }}
            />
            <Tab.Screen
                name="Projects"
                component={ProjectsScreen}
                options={{
                    tabBarLabel: 'Projects'
                }}
            />
            <Tab.Screen
                name="Activity"
                component={ActivityScreen}
                options={{
                    tabBarLabel: 'Activity'
                }}
            />
            <Tab.Screen
                name="Profile"
                component={SettingsScreen}
                options={{
                    tabBarLabel: 'Profile'
                }}
            />
        </Tab.Navigator>
    );
}
