// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your login logic here
    console.log('Logging in with:', email, password);
    // Example navigation to another screen after successful login
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    width: '80%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;






// import React, { useState, useEffect } from 'react';
// import { StyleSheet, ScrollView, View, Image, Text, TextInput, Pressable, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isEmailActive, setIsEmailActive] = useState(false);
//   const [isPasswordActive, setIsPasswordActive] = useState(false);

//   const inputEmailStyle = isEmailActive ? styles.inputActive : styles.input;
//   const inputPasswordStyle = isPasswordActive ? styles.inputActive : styles.input;

//   const handleLogin = async () => {
//     try {
//       // Fetch user data from local storage
//       const userDataString = await AsyncStorage.getItem('registeredUsers');
//       if (!userDataString) {
//         Alert.alert('Error', 'No registered users found. Please sign up.');
//         return;
//       }

//       // Parse user data from JSON
//       const registeredUsers = JSON.parse(userDataString);

//       // Check if the entered email exists in local storage
//       const user = registeredUsers.find((user) => user.email === email);

//       if (user && user.password === password) {
//         // Navigate to the Home screen or perform other actions after successful login
//         navigation.navigate('Home');
//       } else {
//         Alert.alert('Error', 'Invalid email or password. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//     }
//   };

//   return (
//     <ScrollView contentInsetAdjustmentBehavior="automatic">
//       <View style={styles.container}>
//         <View style={styles.logoContainer}>
//           {/* <Image
//             source={require('../../assets/images/Profile.png')}
//             style={styles.logo}
//           /> */}
//           <Text style={styles.title}>Welcome!</Text>
//           <Text>Log in to your existing account.</Text>
//         </View>

//         <View style={styles.formContainer}>
//           <TextInput
//             style={inputEmailStyle}
//             onChangeText={setEmail}
//             onFocus={() => setIsEmailActive(true)}
//             onBlur={() => setIsEmailActive(false)}
//             value={email}
//             placeholder="Email"
//           />
//           <TextInput
//             style={inputPasswordStyle}
//             onChangeText={setPassword}
//             onFocus={() => setIsPasswordActive(true)}
//             onBlur={() => setIsPasswordActive(false)}
//             value={password}
//             secureTextEntry={true}
//             placeholder="Password"
//           />

//           <View style={styles.buttonContainer}>
//             <Pressable style={styles.button} onPress={handleLogin}>
//               <Text style={styles.buttonText}>LOG IN</Text>
//             </Pressable>
//           </View>

//           <View style={styles.signUpContainer}>
//             <Text style={styles.signUpText}>
//               Don’t have an account?{' '}
//               <Pressable onPress={() => navigation.navigate('Register')}>
//                 <Text style={styles.signUpLink}>Sign Up</Text>
//               </Pressable>
//             </Text>
//           </View>

//           <Pressable style={styles.demobutton} onPress={() => navigation.navigate('Home')}>
//               <Text style={styles.buttonText}>View Demo </Text>
//             </Pressable>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 15,
//     backgroundColor: 'white',
//     flex: 1,
//     justifyContent: 'center',
//     // marginTop: 40,
//   },
//   logoContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: 0,
//   },
//   logo: {
//     resizeMode: 'contain',
//     padding: 20,
//     margin: 20,
//     width: 180,
//     height: 180,
//     borderRadius: 50,
//   },
//   title: {
//     fontSize: 30,
//     color: '#6aa84fff',
//   },
//   formContainer: {
//     // paddingTop: 100,
//     paddingBottom: 200,
//   },
//   input: {
//     height: 50,
//     margin: 10,
//     padding: 10,
//     borderRadius: 10,
//     backgroundColor: '#eee',
//   },
//   inputActive: {
//     height: 50,
//     margin: 10,
//     padding: 10,
//     borderWidth: 1,
//     borderRadius: 10,
//     backgroundColor: '#eee',
//     borderColor: '#5cb85c', //#EFC81A
//     color: 'black'
//   },
//   buttonContainer: {
//     margin: 12,
//   },
//   button: {
//     alignItems: 'center',
//     backgroundColor: '#5cb85c',
//     borderRadius: 10,
//     padding: 12,
//   },
//   demobutton: {
//     alignItems: 'center',
//     backgroundColor: 'gray',
//     borderRadius: 10,
//     padding: 7,
//     marginTop: 20,
//     marginLeft: 73,
//     width: "58%",
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 20,
//   },
//   signUpContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   signUpText: {
//     textAlign: 'center',
//   },
//   signUpLink: {
//     color: '#5cb85c',
//   },
// });

// export default LoginScreen;