import { useEffect, useMemo, useRef, useState } from "react";
import { Word } from "../types";
import Choices from "./QuizScreen/Choices/Choices";
import ProgressBar from "./QuizScreen/ProgressBar";
import SourceWord from "./QuizScreen/SourceWord";
import Stats from "./QuizScreen/Stats";
import { shuffleArray } from "../Utils/utils";

interface Props {
  initialWords: Word[];
  resetGame: () => void;
}

interface GameState {
  sourceWord: string;
  correctAnswer: string;
  currentWordIndex: number;
  choices: string[];
  blockAnswering: boolean;
  score: number;
  streak: number;
  level: number;
  progress: number;
}

const NUM_CHOICES = 4;

export default function Quiz({ initialWords, resetGame }: Props) {
  const [words] = useState<Word[]>(initialWords);
  const [gameState, setGameState] = useState(() => {
    const savedProgress = localStorage.getItem("quizProgress");
    return savedProgress
      ? JSON.parse(savedProgress)
      : {
          sourceWord: "",
          correctAnswer: "",
          currentWordIndex: 0,
          choices: [],
          blockAnswering: false,
          score: 0,
          streak: 0,
          level: 1,
          progress: 0,
        };
  });

  const levelUpScore = useMemo(
    () => 2 * Math.pow(gameState.level, 2),
    [gameState.level]
  );

  const correctSound = useRef(new Audio("./sounds/correct.mp3"));
  const incorrectSound = useRef(new Audio("./sounds/incorrect.mp3"));
  const levelUpSound = useRef(new Audio("./sounds/level-up.mp3"));

  useEffect(() => {
    if (words.length > 0) {
      nextWord(gameState.currentWordIndex);
    }
  }, [words]);

  useEffect(() => {
    localStorage.setItem("quizProgress", JSON.stringify(gameState));
  }, [gameState]);

  function nextWord(index: number) {
    const currentWord = words[index];
    const isHebrew = Math.random() < 0.5;

    const sourceWord = isHebrew ? currentWord.hebrew : currentWord.arabic;
    const correctAnswer = isHebrew ? currentWord.arabic : currentWord.hebrew;

    // Populate the question choices
    const newChoices = [correctAnswer];
    while (newChoices.length < NUM_CHOICES) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      const choice = isHebrew ? randomWord.arabic : randomWord.hebrew;
      if (!newChoices.includes(choice)) {
        newChoices.push(choice);
      }
    }

    setGameState((prevState: GameState) => ({
      ...prevState,
      sourceWord,
      correctAnswer,
      choices: shuffleArray(newChoices),
      blockAnswering: false,
    }));
  }

  function checkAnswer(event: React.MouseEvent<HTMLButtonElement>) {
    const userAnswer = event.currentTarget.innerText;

    if (userAnswer === gameState.correctAnswer) {
      correctSound.current.play();
      event.currentTarget.classList.add("correct");
      setGameState((prevState: GameState) => {
        const newProgress = prevState.progress + 1;
        const newLevel =
          newProgress > levelUpScore ? prevState.level + 1 : prevState.level;

        return {
          ...prevState,
          score: prevState.score + 1,
          streak: prevState.streak + 1,
          level: newLevel,
          progress: newLevel > prevState.level ? 1 : newProgress,
          blockAnswering: true,
          currentWordIndex: (prevState.currentWordIndex + 1) % words.length,
        };
      });

      // Delay the nextWord call to ensure the UI updates
      setTimeout(() => {
        const newIndex = (gameState.currentWordIndex + 1) % words.length;
        nextWord(newIndex);
      }, 1000);

      if (gameState.progress >= levelUpScore) {
        setTimeout(() => levelUpSound.current.play(), 300);
      }
    } else {
      incorrectSound.current.play();
      event.currentTarget.classList.add("incorrect");
      setGameState((prevState: GameState) => ({ ...prevState, streak: 0 }));
    }
  }

  return (
    <div className="game-container">
      <ProgressBar percentage={(gameState.progress / levelUpScore) * 100} />
      <Stats
        score={gameState.score}
        streak={gameState.streak}
        level={gameState.level}
      />
      <SourceWord>{gameState.sourceWord || ""}</SourceWord>
      <Choices
        checkAnswer={gameState.blockAnswering ? () => {} : checkAnswer}
        choices={gameState.choices}
      ></Choices>
      <button className="reset-btn" onClick={resetGame}>
        איפוס משחק
      </button>
    </div>
  );
}
