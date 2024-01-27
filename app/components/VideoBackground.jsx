import React, { useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
} from 'react-native';

import { Video, ResizeMode } from 'expo-av';

const { height, width } = Dimensions.get('window');

const VideoBackground = ({play, url, rate, speed}) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  useEffect(()=>{
    video?.current && video.current.setRateAsync(rate * speed.step)
  },[rate])

  return (
    <Video
      ref={video}
      source={url}
      style={styles.backgroundVideo}
      shouldPlay={play}
      rate={speed.initialSpeed}
      // muted={true}
      isLooping
      resizeMode={ResizeMode.COVER}
      onPlaybackStatusUpdate={status => setStatus(() => status)}
    />
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
  });
  
  export default VideoBackground;