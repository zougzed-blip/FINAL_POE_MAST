import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ManageMenuScreen from '../screens/ManageMenuScreen';
import MenuListScreen from '../screens/MenuListScreen';
import FilterMenuScreen from '../screens/FilterMenuScreen';
import ItemDetailsScreen from '../screens/ItemDetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Home Stack Navigator
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="ManageMenu" component={ManageMenuScreen} />
      <Stack.Screen name="FilterMenu" component={FilterMenuScreen} />
      <Stack.Screen name="ItemDetails" component={ItemDetailsScreen} />
    </Stack.Navigator>
  );
}

// Menu List Stack Navigator
function MenuStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MenuListMain" component={MenuListScreen} />
      <Stack.Screen name="ItemDetails" component={ItemDetailsScreen} />
    </Stack.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#2E8B57' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '600' },
        tabBarActiveTintColor: '#2E8B57',
        tabBarInactiveTintColor: '#6C757D',
        tabBarStyle: {
          paddingBottom: 15,
          paddingTop: 5,
          height: 90,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E9ECEF',
        },
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack} 
        options={{ 
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="MenuList" 
        component={MenuStack} 
        options={{ 
          tabBarLabel: 'My Menu',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}