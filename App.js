import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './app/screens/HomeScreen';
import BufetRunScreen from './app/screens/BufetRunScreen';
import PlayScreen from './app/screens/PlayScreen';

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [ difficulty, setDifficulty ] = useState('slow');

  useEffect(()=>{
    console.log('difficulty', difficulty)
  },[difficulty])

  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" children={props => <HomeScreen difficulty={difficulty} setDifficulty={setDifficulty} {...props} />} />
          <Tab.Screen name="Bufet run" children={props => <BufetRunScreen difficulty={difficulty} setDifficulty={setDifficulty} {...props} />} />
        </Tab.Navigator>
      </NavigationContainer>

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
