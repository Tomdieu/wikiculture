import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Simulate a delay (e.g., 2000 milliseconds) before redirecting to the Main screen
    const timeout = setTimeout(() => {
      navigation.replace('Home');
    }, 2000);

    return () => clearTimeout(timeout); // Clear the timeout if the component is unmounted
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/icons/logo.jpeg')}
        style={styles.logo}
      />
      <Text style={styles.welcomeText}>WikiCulture</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Set your background color
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SplashScreen;
