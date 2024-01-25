import React, { useEffect } from 'react';
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
import { Video, ResizeMode } from 'expo-av';

import { images, videos, sounds } from '../utils/constants';
import useGameState from '../components/RegularGameScreen/useGameState';
import AnimatedImage from '../components/RegularGameScreen/AnimatedImage';
import Stats from '../components/Stats';
import useAudio from '../hooks/useAudio';
// import useGameState from '../components/PerspectiveGameScreen/useGameState';
// import AnimatedImage from '../components/PerspectiveGameScreen/AnimatedImage';

const { height, width } = Dimensions.get('window');

const VideoBackground = ({play, url, rate}) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  useEffect(()=>{
    video?.current && video.current.setRateAsync(rate)
  },[rate])

  return (
    <Video
      ref={video}
      source={url}
      style={styles.backgroundVideo}
      shouldPlay={play}
      rate={1}
      // muted={true}
      isLooping
      resizeMode={ResizeMode.COVER}
      onPlaybackStatusUpdate={status => setStatus(() => status)}
    />
  )
};

const PlayAudio = ({play, url}) => {
  const playSound = useAudio();

  useEffect(()=>{
    play && playSound(url)
  },[play])

  return (<></>)
};

const BufetRunScreen = ({ difficulty }) => {
  const gameState = useGameState();

  const {gameEnd, scoreCount, setGameEnd, gameStarted, setGameStarted, setScoreCount, setGameSpeed, gameSpeed } = gameState;

  useEffect(()=>{
    setGameEnd(false)
    setGameStarted(false)
    setScoreCount(0)
    setGameSpeed(1)
  },[difficulty])

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
        <VideoBackground play={gameStarted} url={videos[difficulty]} rate={gameSpeed}/>
        {gameStarted &&
          <PlayAudio play={gameStarted} url={sounds[difficulty]}/>
        }
        <Stats {...gameState}/>
        {gameStarted ?
          <View style={styles.imageContainer}>
            <AnimatedImage gameState={gameState}/>
            <AnimatedImage gameState={gameState} />
            <AnimatedImage gameState={gameState} />
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