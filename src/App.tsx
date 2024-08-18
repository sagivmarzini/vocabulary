import { useEffect, useState } from "react";
import Quiz from "./Components/Quiz";
import UploadScreen from "./Components/UploadScreen";
import { Word } from "./types";
import { shuffleArray } from "./Utils/utils";

function App() {
  const [gameRunning, setGameRunning] = useState(false);
  const [words, setWords] = useState<Word[]>([]);
  const [shuffledWords, setShuffledWords] = useState<Word[]>([]);

  useEffect(() => {
    setShuffledWords(shuffleArray(words));
  }, [words])

  return (
    <>
      {!gameRunning && (
        <UploadScreen setWords={setWords} startGame={() => setGameRunning(true)} />
      )}
      {gameRunning && <Quiz words={shuffledWords} />}
    </>
  );
}

export default App;
