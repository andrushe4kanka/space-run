import React, {useRef, useEffect, useState } from 'react';
import { random } from 'lodash';
import { Audio } from 'expo-av';

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

import { gameImages, images, sounds } from '../../utils/constants';

const { height, width } = Dimensions.get('window');

const AnimatedImage = props => {
  const {
    setGameEnd,
    scoreCount,
    setScoreCount,
    gameSpeed,
    setGameSpeed,
  } = props.gameState;

  const {
    position
  } = props;

  const positions = [
    -100,
    0,
    100
  ]

  const moveAnim = useRef(new Animated.ValueXY({x: 0, y: 0.2})).current;
  const [initial, setInitial] = useState(true) 
  const [currentImage, setCurrentImage] = useState(null);
  const [state, setState] = useState({
    end: false,
    clicked: false,
    fresh: null
  });

  const [sound, setSound] = useState();

  async function playSound(url) {
    const { sound } = await Audio.Sound.createAsync(url);
    setSound(sound);

    await sound.playAsync();
  }
  
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(()=>{
    return () => {
      Animated.timing(moveAnim, {
        toValue: {x: 0, y: 0.2},
        duration: 3000,
        useNativeDriver: true,
      }).stop();
    };
  },[moveAnim])

  useEffect(()=>{
    if(state?.end || initial){
      setInitial(false)
      if (state?.fresh && !state?.clicked) {
        playSound(sounds.diarrea)
        setGameEnd(true)
        setGameSpeed(1)
        // moveAnim.resetAnimation()
        // setCurrentImage(null)
      } else {
        setTimeout(()=> {
          moveAnim.setValue({x: 0, y: 0.2})
          const image = randomImage()
          setState({
            end: false,
            clicked: false,
            fresh: image.fresh
          })
          setCurrentImage(image)
          animation(image, state)
        }, random(1000, 2000))
      }
     }
  },[state])

  useEffect(()=>{
    setScoreCount(0)
  },[])

  function animation(currentImage) {
    return Animated.sequence([
      Animated.timing(moveAnim, {
        toValue: {x: height /2, y: 1.2},
        duration: 3000 / gameSpeed,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ]).start(event => {
      setTimeout(()=>{
        setState(prevState => ({
          end: true,
          clicked: prevState?.clicked,
          fresh: prevState?.fresh,
        }));
    });
      },2000)
  }

  function randomImage() {
    return gameImages[random(0,gameImages?.length - 1)]
  };

  function stinkyClicked() {
    playSound(sounds.diarrea)
    setGameEnd(true)
    setGameSpeed(1)
    setCurrentImage(null)
  }

  function freshClicked() {
    playSound(sounds.eating)
    setScoreCount(scoreCount + 10)
    setGameSpeed(gameSpeed + 0.1)
    setCurrentImage({
      ...currentImage,
      src: null
    })
    setState(prevState => ({
      ...prevState,
      clicked: true
    }))
  }

    return (
      <TouchableWithoutFeedback
        onPress={() => currentImage?.fresh ? freshClicked() : !state.clicked && stinkyClicked()}
      >
        <Animated.Image
          source={currentImage?.src}
          // source={gameImages[0]?.src}
          resizeMode="contain"

          style={{
            ...props.style,
            transform: [{translateY: moveAnim.x}, {translateX: 0}, {scale: moveAnim.y}],
            height: width / 3 - 20,
            width:width / 3 - 20,
            // position: 'absolute',
          }}
        />
      </TouchableWithoutFeedback>

    )
};

export default AnimatedImage;