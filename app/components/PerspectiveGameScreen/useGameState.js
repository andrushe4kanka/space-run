import React, { useState } from 'react';

const useGameState = () => {
  const [gameEnd, setGameEnd] = useState(false);
  const [scoreCount, setScoreCount] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(1);
  return {
    gameEnd,
    setGameEnd,
    scoreCount,
    setScoreCount,
    gameSpeed,
    setGameSpeed,
  }
}
  
  export default useGameState;