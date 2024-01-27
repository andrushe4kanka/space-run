import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './app/screens/HomeScreen';
import BufetRunScreen from './app/screens/BufetRunScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
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
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen 
            name="Home" 
            children={props => 
              <HomeScreen 
                difficulty={difficulty} 
                setDifficulty={setDifficulty} 
                bestScore={bestScore} 
                setBestScore={setBestScore}
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
      </NavigationContainer>

  );
};
