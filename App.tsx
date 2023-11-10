import SplashScreen from 'react-native-splash-screen';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
// import homeIcon from './assets/home.png';
// import addIcon from './assets/createpost.png';
// import notificationsIcon from './assets/notifications.png';
// import personIcon from './assets/profile1.png';


import LoginScreen from './src/Screens/LoginScreen';
import CreateAccount from './src/Screens/CreateAccount';
import Welcome from './src/Screens/Welcome';
import ChatScreen from './src/Screens/ChatScreen';
import MainMenu from './src/Screens/MainMenu';
import Notification from './src/Screens/Notification';
import Profile from './src/Screens/Profile';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  App: undefined;
};

export type TabParamList = {
  Welcome: undefined;
  Messages: undefined;
  Notification: undefined;
  MainMenu: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const App: React.FC = () => {
  const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch data
        // Load all necessary data
        // Then hide the splash screen
        SplashScreen.hide();

        setIsSplashScreenVisible(false);
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  if (isSplashScreenVisible) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={CreateAccount} />
          <Stack.Screen name="App" component={AppTabs} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

const AppTabs: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Home" 
        component={Welcome}
        options={{
          tabBarIcon: ({ color }) => <Image
          source={require('./assets/home.png')}  style={{ width: 30, height: 30, tintColor: color }} />,
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        }} 
      />
      <Tab.Screen 
        name="Create Post" 
        component={ChatScreen} 
        options={{
          tabBarIcon: ({ color }) =>  
          <Image
          source={require('./assets/plus.png')} // Replace with the actual path to your image
          style={{ width: 25, height: 25, tintColor: color }} />,
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        }} 
      />
      <Tab.Screen 
        name="Notification" 
        component={Notification} 
        options={{
          tabBarIcon: ({ color }) => <Image
          source={require('./assets/notification.png')}  style={{ width: 30, height: 30, tintColor: color }} />,
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <Image
          source={require('./assets/profile1.png')}  style={{ width: 30, height: 30, tintColor: color }} />,
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        }} 
      />
    </Tab.Navigator>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
