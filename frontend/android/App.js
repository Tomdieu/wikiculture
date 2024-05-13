// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/pages/SplashScreen';
import HomeScreen from './src/pages/screens/HomeScreen';
import LoginScreen from './src/pages/Auth/LoginScreen';
import RegisterScreen from './src/pages/Auth/RegisterScreen';
import DescribePage from './src/pages/screens/DescribePage';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Details" component={DescribePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
