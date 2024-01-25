import React, { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

const useAudio = () => {
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

    return playSound;
};

export default useAudio;