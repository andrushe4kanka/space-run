import React, { useEffect } from 'react';
import useAudio from '../hooks/useAudio';

const PlayAudio = ({play, url}) => {
  const playSound = useAudio();

  useEffect(()=>{
    play && playSound(url)
  },[play])

  return (<></>)
};
  
export default PlayAudio;