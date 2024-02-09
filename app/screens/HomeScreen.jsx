import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  Pressable,
  ImageBackground
} from 'react-native';

// import { useNavigation } from '@react-navigation/native';

import { images } from '../utils/constants';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Легко',
    type: 'slow',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Средне',
    type: 'middle',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Тяжко',
    type: 'fast',
  },
];

const Item = ({title, bestScore, image}) => (
  <View style={styles.item}>
    <Image source={image} style={styles.itemImage}/>
    <View style={styles.itemInfo}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.score}>Лучший счет: {bestScore}</Text>
    </View>
  </View>
);

const LogoSection = () => (
  <View style={styles.logoContainer}>
    <Image source={images.logo}/>
  </View>
);

const ResetSection = ({setBestScore}) => (
  <View style={styles.resetContainer}>
    <Pressable 
      onPress={()=> setBestScore({
        slow: 0,
        middle: 0,
        fast: 0
      })}
      style={styles.button}
    >
      <Text style={styles.resetText}>Обнулить счет</Text>
    </Pressable>
  </View>
);

const Logout = ({setUser}) => (
  <View style={styles.resetContainer}>
    <Pressable 
      onPress={()=> setUser(null)}
      style={styles.button}
    >
      <Text style={styles.resetText}>Выйти</Text>
    </Pressable>
  </View>
);

const BottomSection = ({children}) => (
  <View style={styles.bottomSection}>
    {children}
  </View>
);

const HomeScreen = ({ setDifficulty, navigation, bestScore, setBestScore, setUser }) => {

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={images.homeBackground} resizeMode="cover" style={styles.homeBackground}>
        <LogoSection />
        <FlatList
          data={DATA}
          renderItem={({item}) => (
            <Pressable onPress={()=> {
              setDifficulty(item.type);
              navigation.navigate('Bufet run')
            }}>
              <Item title={item.title} bestScore={bestScore[item.type]} image={images[item.type]}/>
            </Pressable>
          )}
          keyExtractor={item => item.id}
        />
        <BottomSection>
          <ResetSection setBestScore={setBestScore}/>
          <Logout setUser={()=>setUser(null)}/>
        </BottomSection>

      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  homeBackground: {
    flex: 1,
  },
  logoContainer: {
    margin: 10,
    marginTop:30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  resetContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20
  },
  resetText: {
    fontSize: 20,
    color: '#FF5A21'
  },
  itemImage: {
    margin: 10,
    height: 100,
    width: 100
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFF',
  },
  item: {
    backgroundColor: 'rgba(240,234,214, 0.7)',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
    boxShadow: '0px 10px 20px 5px rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'row',
  },
  itemInfo: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 10
  },
  title: {
    fontSize: 32,
    color: '#FF5A21'
  },
  score: {
    fontSize: 20,
    color: '#FF5A21'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 420,
    elevation: 3,
    backgroundColor: 'rgba(240,234,214, 0.7)',
    boxShadow: '0px 10px 20px 5px rgba(0, 0, 0, 0.5)',
  },
});

export default HomeScreen;