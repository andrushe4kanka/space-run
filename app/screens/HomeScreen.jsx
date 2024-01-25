import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  Pressable
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

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const LogoSection = () => (
  <View style={styles.logoContainer}>
    <Image source={images.logo}/>
  </View>
);


// const HomeScreen = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={DATA}
//         renderItem={({item}) => <Item title={item.title} />}
//         keyExtractor={item => item.id}
//       />
//     </SafeAreaView>
//   );
// };

const HomeScreen = ({ setDifficulty, navigation }) => {
  // const {navigation} = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <LogoSection />
      <FlatList
        data={DATA}
        renderItem={({item}) => (
          <Pressable onPress={()=> {
            setDifficulty(item.type);
            navigation.navigate('Bufet run')
          }}>
            <Item title={item.title} />
          </Pressable>
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    margin: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFF',
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default HomeScreen;