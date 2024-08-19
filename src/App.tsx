import { useEffect, useState } from "react";
import Quiz from "./Components/Quiz";
import UploadScreen from "./Components/UploadScreen";
import { Word } from "./types";

function App() {
  const [gameState, setGameState] = useState<{gameRunning: boolean, words: Word[]}>(() => {
    const savedState = localStorage.getItem('gameState');
    return savedState ? JSON.parse(savedState) : { gameRunning: false, words: [] };
  });

  useEffect(() => {
    localStorage.setItem('gameState', JSON.stringify(gameState));
  }, [gameState]);

  const startGame = (newWords?: Word[]) => {
    setGameState(prevState => ({
      gameRunning: true,
      words: newWords || prevState.words
    }));
  };

  const resetGame = () => {
    setGameState({ gameRunning: false, words: [] });
    localStorage.removeItem('quizProgress');
  };

  return (
    <>
      {!gameState.gameRunning && (
        <UploadScreen setWords={startGame} startGame={() => startGame()} />
      )}
      {gameState.gameRunning && <Quiz initialWords={gameState.words} resetGame={resetGame} />}
    </>
  );
}

export default App;