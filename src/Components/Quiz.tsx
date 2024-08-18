import { useEffect, useState } from "react"
import { Word } from "../types"
import Choices from "./QuizScreen/Choices/Choices"
import ProgressBar from "./QuizScreen/ProgressBar"
import SourceWord from "./QuizScreen/SourceWord"
import Stats from "./QuizScreen/Stats"
import { shuffleArray } from "../Utils/utils"

interface Props {
  words: Word[]
};

const correctSound = new Audio('./sounds/correct.mp3');
const incorrectSound = new Audio('./sounds/incorrect.mp3');
const levelUpSound = new Audio('./sounds/level-up.mp3');

export default function Quiz({ words }: Props) {
  const [sourceWord, setSourceWord] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [choices, setChoices] = useState<string[]>([]);
  const [blockAnswering, setBlockAnswering] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);
  const [progress, setProgress] = useState(0);
  const [levelUpScore, setLevelUpScore] = useState(3);
  
  useEffect(() => {
    if (words.length > 0) {
      nextWord(); // Initialize with the first word
    }
  }, [words]);

  function nextWord() {
    const currentWord = words[currentWordIndex];
    const isHebrew = Math.random() < 0.5;

    setBlockAnswering(false);

    setSourceWord(isHebrew ? currentWord.hebrew : currentWord.arabic);
    setCorrectAnswer(isHebrew ? currentWord.arabic : currentWord.hebrew);

    // Initialize choices with the correct answer
    const newChoices = [isHebrew ? currentWord.arabic : currentWord.hebrew];

    // Fill the remaining choices
    while (newChoices.length < 4) {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        const choice = isHebrew ? randomWord.arabic : randomWord.hebrew;

        if (!newChoices.includes(choice)) {
            newChoices.push(choice);
        }
    }

    setChoices(shuffleArray(newChoices));
    setCurrentWordIndex(index => index + 1);
  }

  function checkAnswer(event: React.MouseEvent<HTMLButtonElement>) {
    
    const userAnswer = event.currentTarget.innerText;
    
    if (userAnswer === correctAnswer) {
      setBlockAnswering(true);
      correctSound.play();
      event.currentTarget.classList.add('correct');
      setStreak(streak => streak + 1);
      setScore(score => score + 1);
      setProgress(progress => progress + 1);
      if (progress + 1 >= levelUpScore) {
        setProgress(progress => progress + 1);
        setTimeout(() => {
          levelUp();
        }, 300);
      }

      setTimeout(() => {
        nextWord();
      }, 1000);
    } else {
      incorrectSound.play();
      event.currentTarget.classList.add('incorrect');
      setStreak(0);
    }
  }

  function levelUp() {
    levelUpSound.play();
    setLevel(level => level + 1);
    setProgress(0);

    setLevelUpScore(2 * Math.pow(level, 2));
  }
  
  return (
    <>
        <ProgressBar percentage={progress / levelUpScore * 100}/>
        <Stats score={score} streak={streak} level={level}/>
        <SourceWord>{sourceWord || ''}</SourceWord>
        <Choices checkAnswer={blockAnswering ? () => {} : checkAnswer} choices={choices}></Choices>
    </>
  )
}
