import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, View, FlatList, SafeAreaView, Button, TextInput } from 'react-native';
import { Formik } from 'formik';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/screens/HomeScreen';
import BufetRunScreen from './app/screens/BufetRunScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { app } from './firebaseConfig'
import SignUpScreen from './app/screens/SignUp';
import SignInScreen from './app/screens/SignIn';
import SignUpWithOtp from './app/screens/SignUpWithOtp';
import SignInWithOtp from './app/screens/SignInWithOtp';

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function BufetRunNavigator({setUser}) {
  const [ difficulty, setDifficulty ] = useState('slow');
  const [bestScore, setBestScore] = useState({
    slow: 0,
    middle: 0,
    fast: 0
  })

  useEffect(()=>{
    console.log('difficulty', difficulty)
  },[difficulty])

  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        children={props => 
          <HomeScreen 
            difficulty={difficulty} 
            setDifficulty={setDifficulty} 
            bestScore={bestScore} 
            setBestScore={setBestScore}
            setUser={setUser}
            {...props} 
          />
        } 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Bufet run" 
        children={props => 
          <BufetRunScreen 
            difficulty={difficulty} 
            setDifficulty={setDifficulty} 
            bestScore={bestScore} 
            setBestScore={setBestScore}
            {...props} 
          />
        } 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="run-fast" color={color} size={size} />
          ),
        }}
      />
  </Tab.Navigator>
  )
};

export default function App() {
    const [user, setUser] = useState();

  return (
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{
            // headerShown: false,
          }}
        >
        {!user ? (
            // Auth screens
            <Stack.Group>
              <Stack.Screen 
                name="Sign In" 
                children={props => <SignInWithOtp setUser={setUser} {...props}/>}
              />
              <Stack.Screen 
                name="Sign Up" 
                children={props => <SignUpWithOtp setUser={setUser} {...props}/>}
              />
            </Stack.Group>
          ) : (
            // Screens for logged in users
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen 
                name="BufetRun" 
                children={props => <BufetRunNavigator setUser={setUser}/>}
              />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
  );
};

// const styles = StyleSheet.create({
//  container: {
//     flex: 1,
//     marginBottom: 0,
//   },
// })
