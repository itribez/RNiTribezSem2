import React, { useState,useEffect } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import MyCheckbox from '../Components/MyCheckbox';
import { NavigationContainer } from '@react-navigation/native';
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import Welcome from './Welcome';
import CreateAccount from './CreateAccount';
import { TabParamList } from '../../App';
import AuthService from '../Services/AuthService';
import {auth} from '../FirebaseConfig'

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  App: { screen: keyof TabParamList };
  Welcome: undefined;
};
type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: LoginScreenProps) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  let data: any = null;

  useEffect(() => {
    const fetchData = async () => {
      data = await AuthService.checkForStoredToken();
    };
    fetchData();
  }, []);


  const handleLogin = async () => {
    try {
      // Call the login function from AuthService with the email and password state variables
      const result = await AuthService.login(email, password);
  
      // If the login was successful, navigate to the Welcome screen
      if (result.success) {
        console.log("User is signed in");
        navigation.navigate('App', { screen: 'Welcome' }); // Navigate to the Welcome screen
      } else {
        // If login wasn't successful, show an alert with the returned message
        Alert.alert('Login failed: ' + result.message);
      }
    } catch (error:any) {
      // If there was an error during the login process, log it and show an alert
      console.error('Login failed!', error);
      Alert.alert('Login failed: ' + error.message);
    }
  };
  
  

  const handleGoogleLogin = () => {
    // Handle the login logic here
    console.log("Logging in with email: ", email, " and password: ", password);
  };


  const handleFBLogin = () => {
    // Handle the login logic here
    console.log("Logging in with email: ", email, " and password: ", password);
  };

  return (
    <View style={styles.container}>
      <Image 
        style={styles.logo}
        source={require('../../assets/logo.png')} //local path
      />

      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      <View style={styles.checkboxForgotContainer}>
        <View style={styles.checkboxContainer}>
          <MyCheckbox isSelected={rememberMe} onCheckboxClick={() => setRememberMe(!rememberMe)} />
          <Text style={styles.label}>Remember me</Text>
        </View>

        <TouchableOpacity onPress={() => console.log('Forgot Password?')}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <View style={styles.signUpContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.justText}>Or</Text>

      <TouchableOpacity style={styles.signUpUsingServiceProvidersButton} onPress={handleGoogleLogin}>
        <Text style={styles.buttonText}>Sign In with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signUpUsingServiceProvidersButton} onPress={handleFBLogin}>
        <Text style={styles.buttonText}>Sign In with Facebook</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  welcomeMessage: {
    fontSize: 24,
    textAlign: 'center',
    margin: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  checkboxForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    margin: 8,
  },
  forgotPassword: {
    textAlign: 'right',
    color: 'blue',
    marginBottom: 20,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
    marginTop: 20,
    marginBottom: 20,
  },
  signupText: {
    textAlign: 'center',
  },
  signupLink: {
    textAlign: 'center',
    color: 'blue',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  signUpUsingServiceProvidersButton: {
    backgroundColor: '#000000',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  justText: {
    color: 'gray',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default LoginScreen;
