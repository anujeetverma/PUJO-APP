import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import RouteScreen from '../screens/RouteScreen';

export type RootStackParamList = {
  Home: undefined;
  Route: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false // <--- Global Default: OFF (Boolean)
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen
          name="Route"
          component={RouteScreen}
          options={{
            headerShown: true, // <--- Route Screen: ON (Boolean)
            title: 'Your Route',
            headerTintColor: '#d32f2f'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}