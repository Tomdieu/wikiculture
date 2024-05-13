// RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Dot } from 'lucide-react-native';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleRegister = () => {
    // Add registration logic here
    console.log('Registering with:', email, username, password, confirmPassword);
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FontAwesome name="arrow-left" size={24} color="#4ea0f9" />
      </TouchableOpacity>
      <Text style={styles.title}>Create an Account</Text>
      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={20} color="#4ea0f9" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={20} color="#4ea0f9" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="#4ea0f9" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity style={styles.eyeButton} onPress={togglePasswordVisibility}>
          <FontAwesome name={isPasswordVisible ? 'eye-slash' : 'eye'} size={20} color="#4ea0f9" />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="#4ea0f9" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!isConfirmPasswordVisible}
        />
        <TouchableOpacity style={styles.eyeButton} onPress={toggleConfirmPasswordVisibility}>
          <FontAwesome name={isConfirmPasswordVisible ? 'eye-slash' : 'eye'} size={20} color="#4ea0f9" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <View style={styles.otherOptionsContainer}>
        <Text style={styles.otherOptionsText}>Already have an account?</Text>
        <TouchableOpacity style={styles.createAccountButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View> 
      <View style={styles.forgotPasswordSection}>
        <TouchableOpacity style={styles.forgotPassword} onPress={()=>{}}>
          <Text style={styles.forgotPasswordText}>Forgot Password?    </Text>
        </TouchableOpacity>
        <Dot color={"#b5b0b0"} size={34} style={{ position: "absolute", right: 5, marginRight: 125, zIndex: 30 }} />
        <TouchableOpacity style={styles.otherOptionLink} onPress={()=>{}}>
          <Text style={styles.otherOptionLinkText}>Privacy Policy</Text>
        </TouchableOpacity> 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 35,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
    marginTop: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  icon: {
    marginRight: 10,
  },
  eyeButton: {
    position: 'absolute',
    right: 10,
    zIndex: 1,
  },
  registerButton: {
    backgroundColor: '#4ea0f9e8',
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#4ea0f9',
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 35,
  },
  otherOptionsContainer: {
    flexDirection: 'column', // Align elements as column
    alignItems: 'center', // Align items in the center horizontally
  },
  otherOptionsText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
  createAccountButton: {
    backgroundColor: '#ccc',
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: 315, // Add width for better visibility
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  otherOptionLink: {
    marginLeft: 5,
  },
  otherOptionLinkText: {
    fontSize: 16,
    color: '#4ea0f9',
    // textDecorationLine: 'underline',
  },
  forgotPasswordSection: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default RegisterScreen;
