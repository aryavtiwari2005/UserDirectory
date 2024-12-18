import { Text, View } from "react-native";
import React from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserListScreen from './src/screens/UserListScreen';
import UserDetailsScreen from './src/screens/UserDetailsScreen';

export type RootStackParamList = {
  UserList: undefined;
  UserDetails: { user: User };
};

export interface User {
  id: number;
  name: string;
  email: string;
  address: { street: string; city: string; zipcode: string };
  company: { name: string };
}

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationIndependentTree>
      <Stack.Navigator initialRouteName="UserList">
        <Stack.Screen name="UserList" component={UserListScreen} options={{ title: 'User Directory' }} />
        <Stack.Screen
          name="UserDetails"
          component={UserDetailsScreen}
          options={({ route }) => ({
            title: route.params.user.name.split(' ')[0],
          })}
        />
      </Stack.Navigator>
    </NavigationIndependentTree>
  );
}
