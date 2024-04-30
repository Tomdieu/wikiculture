import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import BottomTabNavigator from '../navigations/BottomTabNavigator'; // Import the BottomTabNavigator

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
        <BottomTabNavigator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e7e7e7',
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
});

export default HomeScreen;