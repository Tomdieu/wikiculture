import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, Pressable, Image, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox';
import SelectDropdown from 'react-native-select-dropdown';
import RadioButtonRN from 'radio-buttons-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isHealthy, setIsHealthy] = useState(false);
  const [selectedSickness, setSelectedSickness] = useState('');

  const toggleHealthStatus = () => {
    setIsHealthy(!isHealthy);
  };

  const sickness = ['HiV', 'Malaria', 'Typhoid', 'Cough'];

  const radioButtonsData = [
    { label: 'Male' },
    { label: 'Female' },
    // { label: 'Other' },
  ];

  const inputNameStyle = styles.input;
  const inputEmailStyle = styles.input;
  const inputPhoneStyle = styles.input;
  const inputPasswordStyle = styles.input;
  const inputConfirmPasswordStyle = styles.input;

  const handleRegistration = async () => {
    try {
      // Fetch existing registered users or initialize an empty array
      const existingUsersString = await AsyncStorage.getItem('registeredUsers');
      const existingUsers = existingUsersString ? JSON.parse(existingUsersString) : [];

      // Check if the email is already registered
      const isEmailRegistered = existingUsers.some((user) => user.email === email);

      if (isEmailRegistered) {
        Alert.alert('Error', 'This email is already registered. Please use a different email.');
        return;
      }

      // Check if passwords match
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match. Please enter matching passwords.');
        return;
      }

      // Create a new user object
      const newUser = {
        name,
        email,
        phone,
        password,
        isHealthy,
        selectedSickness,
      };

      // Add the new user to the array
      existingUsers.push(newUser);

      // Save the updated array back to local storage
      await AsyncStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

      // Navigate to the Login screen
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            // source={require('../../assets/images/Profile.png')}
            style={styles.logo}
          />
          <Text style={styles.headerTitle}>Let’s Get Started!</Text>
          <Text>Create a new account to access all features</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={inputNameStyle}
            onChangeText={setName}
            value={name}
            placeholder="Name"
          />
          <TextInput
            style={inputEmailStyle}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
          />
          <TextInput
            style={inputPhoneStyle}
            onChangeText={setPhone}
            value={phone}
            placeholder="Phone Number"
          />
          <TextInput
            style={inputPasswordStyle}
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
            placeholder="Create New Password"
          />
          <TextInput
            style={inputConfirmPasswordStyle}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            secureTextEntry={true}
            placeholder="Confirm New Password"
          />

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Healthy?"
              checked={isHealthy}
              onPress={toggleHealthStatus}
              containerStyle={styles.checkbox}
              textStyle={styles.checkboxText}
            />
          </View>

          <RadioButtonRN
            data={radioButtonsData}
            selectedBtn={(e) => console.log(e)}
            style={styles.radioButtonContainer}
          />

          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={handleRegistration}>
              <Text style={styles.buttonText}>CREATE</Text>
            </Pressable>
          </View>

          <Text style={styles.loginText}>
            Already have an account?{' '}
            <Pressable onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.loginLink}>Log In Here</Text>
            </Pressable>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginTop: -200,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  logo: {
    resizeMode: 'contain',
    padding: 20,
    margin: 20,
    width: 180,
    height: 180,
    borderRadius: 50,
  },
  headerTitle: {
    fontSize: 30,
    color: '#6aa84fff',
  },
  formContainer: {
    paddingBottom: 100,
  },
  input: {
    height: 50,
    margin: 12,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  buttonContainer: {
    margin: 12,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#5cb85c',
    borderRadius: 10,
    padding: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  loginText: {
    textAlign: 'center',
  },
  loginLink: {
    color: '#5cb85c',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginLeft: 10,
  },
  checkboxText: {
    fontSize: 16,
    color: '#333',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
    marginBottom: 20,
    padding: 20,
  },
});

export default RegisterScreen;
