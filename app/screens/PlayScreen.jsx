import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  Easing,
  Animated,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';

import { images } from '../utils/constants';
// import useGameState from '../components/RegularGameScreen/useGameState';
// import AnimatedImage from '../components/RegularGameScreen/AnimatedImage';
import useGameState from '../components/PerspectiveGameScreen/useGameState';
import AnimatedImage from '../components/PerspectiveGameScreen/AnimatedImage';

const PlayScreen = props => {
  const gameState = useGameState()

  const {gameEnd, scoreCount, setGameEnd, setScoreCount } = gameState;

  if (gameEnd) {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={()=> setGameEnd(false)}>
          <ImageBackground source={images?.diarrheaBackground} resizeMode="cover" style={{...styles.image, ...styles.endContainer}}>
            <Text style={styles.text}>Your score: {scoreCount}</Text>
          </ImageBackground>
        </TouchableWithoutFeedback>

      </View>
    )
  }

    return (
        <View style={styles.container}>
          <ImageBackground source={images?.gameBackground} resizeMode="cover" style={styles.image}>
            <View style={styles.imageContainer}>
              <AnimatedImage position={0} gameState={gameState}/>
              <AnimatedImage position={1} gameState={gameState} />
              <AnimatedImage position={2} gameState={gameState} />
            </View>
          </ImageBackground>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    image: {
      flex: 1,
      display:'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end'
    },
    endContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

    },
    imageContainer: {
      position: 'relative',
      height: '50%',
      // flex: 1,
      display:'flex',
      alignItems: 'flex-start',
      flexDirection: 'row',
      justifyContent: 'space-evenly'
      // width: '150px',
    },
    text: {
      fontSize: 30,
      color: 'red'
    }
  });
  
  export default PlayScreen;