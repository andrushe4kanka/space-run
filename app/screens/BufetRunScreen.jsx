import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';

import { images, videos, sounds, videoSpeed, spawnTimeout } from '../utils/constants';
import useGameState from '../hooks/useGameState';
import AnimatedImage from '../components/AnimatedImage';
import Stats from '../components/Stats';
import VideoBackground from '../components/VideoBackground';
import PlayAudio from '../components/PlayAudio';

const { height, width } = Dimensions.get('window');

const BufetRunScreen = ({ difficulty, setBestScore, bestScore }) => {
  const gameState = useGameState();

  const {gameEnd, scoreCount, setGameEnd, gameStarted, setGameStarted, setScoreCount, setGameSpeed, gameSpeed } = gameState;

  useEffect(()=>{
    setGameEnd(false)
    setGameStarted(false)
    setScoreCount(0)
    setGameSpeed(1)
  },[difficulty])

  useEffect(()=>{
    gameEnd && scoreCount >  bestScore[difficulty] && setBestScore(prevState =>({
      ...prevState,
      [difficulty]: scoreCount
    }))
  },[gameEnd])

  if (gameEnd) {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={()=> setGameEnd(false)}>
          <ImageBackground source={images?.diarrheaBackground} resizeMode="cover" style={{...styles.image, ...styles.endContainer}}>
            <Text style={styles.text}>Твое очко: {scoreCount}</Text>
            <Text style={styles.text}>Жми для рестарта</Text>
          </ImageBackground>
        </TouchableWithoutFeedback>

      </View>
    )
  }

    // return (
    //   <View style={styles.container}>
    //     <ImageBackground source={images?.gameBackground} resizeMode="cover" style={styles.image}>
    //       <Stats {...gameState}/>
    //       <View style={styles.imageContainer}>
    //         <AnimatedImage gameState={gameState}/>
    //         <AnimatedImage gameState={gameState} />
    //         <AnimatedImage gameState={gameState} />
    //       </View>
    //     </ImageBackground>
    //   </View>
    // )

    return (
      <View style={styles.container}>
        <VideoBackground play={gameStarted} url={videos[difficulty]} rate={gameSpeed} speed={videoSpeed[difficulty]}/>
        {gameStarted &&
          <PlayAudio play={gameStarted} url={sounds[difficulty]}/>
        }
        <Stats {...gameState}/>
        {gameStarted ?
          <View style={styles.imageContainer}>
            <AnimatedImage gameState={gameState} spawnTimeout={spawnTimeout[difficulty]} />
            <AnimatedImage gameState={gameState} spawnTimeout={spawnTimeout[difficulty]} />
            <AnimatedImage gameState={gameState} spawnTimeout={spawnTimeout[difficulty]} />
          </View>
          : 
          <TouchableWithoutFeedback onPress={()=> setGameStarted(true)}>
            <View style={{...styles.image, ...styles.endContainer}}>
              <Text style={styles.text}>Жми чтобы играть</Text>
            </View>

          </TouchableWithoutFeedback>
        }

    </View>
    )
};

const styles = StyleSheet.create({
    backgroundVideo: {
      height: height,
      position: "absolute",
      top: 0,
      left: 0,
      alignItems: "stretch",
      bottom: 0,
      right: 0
    },
    container: {
      position: 'relative',
      flex: 1,
      marginTop: 0,
    },
    image: {
      flex: 1,
    },
    endContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

    },
    imageContainer: {
      position: 'relative',
      height: '100%',
      flex: 1,
      display:'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly'
      // width: '150px',
    },
    text: {
      fontSize: 30,
      color: '#FF5A21'
    }
  });
  
  export default BufetRunScreen;