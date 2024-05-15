// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Dot } from 'lucide-react-native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async() => {
    // console.log('Logging in with:', identifier, password);
    const body = {
      username:identifier,
      password
    }

    const res = await fetch('http://192.168.173.184:8000/api/login/',{
      method:'POST',
      body:JSON.stringify(body),
      headers:{
      'Content-Type':'application/json'
      }
    })

    const data = await res.json()
    console.log(data)

    navigation.navigate('Home');
 
  };

  const handleCreateAccount = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FontAwesome name="arrow-left" size={24} color="#4ea0f9" />
      </TouchableOpacity>
      <Text style={styles.title}>Welcome Back!</Text>
      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={20} color="#4ea0f9" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email or Username"
          value={identifier}
          onChangeText={setIdentifier}
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
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.otherOptionsText}>Don't have an account?</Text>

      <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Join Wikiculture</Text>
      </TouchableOpacity>
      <View style={styles.otherOptionsContainer}>
      <TouchableOpacity style={styles.forgotPassword} onPress={()=>{}}>
        <Text style={styles.forgotPasswordText}>Forgot Password? </Text>
      </TouchableOpacity>

       <Dot color={"#b5b0b0"} size={34} style={{ position: "absolute", right: 5, marginRight: 125, zIndex: 30 }} />

        <TouchableOpacity style={styles.otherOptionLink} onPress={()=>{}}>
          <Text style={styles.otherOptionLinkText}>  Privacy Policy</Text>
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
  loginButton: {
    backgroundColor: '#4ea0f9e8',
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  createAccountButton: {
    backgroundColor: '#ccc',
    height: 40,
    color: '#4ea0f9',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#4ea0f9',
    fontSize: 16,
    // textDecorationLine: 'underline',
    textAlign: 'center',
  },
  otherOptionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  otherOptionsText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 70,
    marginBottom: 5,
    marginTop: 25,
  },
  otherOptionLink: {
    marginLeft: 5,
  },
  otherOptionLinkText: {
    fontSize: 16,
    color: '#4ea0f9',
    // textDecorationLine: 'underline',
  },
});

export default LoginScreen;
