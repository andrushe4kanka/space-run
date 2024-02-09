import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Dimensions,
} from 'react-native';

import { videos } from '../../utils/constants';

import { Video, ResizeMode } from 'expo-av';

const { height, width } = Dimensions.get('window');

const VIDEOS = [videos.authBackground, videos.authBackground2]

const AuthBackground = ({speed, url }) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [source, setSource] = useState(VIDEOS[0])
  const [end, setEnd] = useState(false)

  useEffect(() => {
    if (status?.didJustFinish && !end) {
      setSource(VIDEOS[1])
      video.current.playFromPositionAsync(0);
      setEnd(true)
    }
  }, [status]);

  return (
    <Video
      ref={video}
      source={source}
      style={styles.backgroundVideo}
      shouldPlay={true}
      rate={speed}
      // muted={true}
      // isLooping
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
  
  export default AuthBackground;