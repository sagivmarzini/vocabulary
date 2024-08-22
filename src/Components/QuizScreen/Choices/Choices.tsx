import { useEffect, useRef } from "react";
import "./choices.css";
import ChoiceButton from "./ChoiceButton";

interface Props {
  choices: string[];
  checkAnswer: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Choices({ choices, checkAnswer }: Props) {
  const buttonsRef = useRef<HTMLButtonElement[]>([]);

  useEffect(() => {
    const keyMap: { [key: string]: number } = {
      q: 1,
      w: 0,
      a: 3,
      s: 2,
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      const index = keyMap[event.key];
      if (index !== undefined) {
        const button = buttonsRef.current[index];
        if (button) {
          button.classList.add("active");
          button.click();
          setTimeout(() => button.classList.remove("active"), 150);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    resetButtonStates();
  }, [choices]);

  const resetButtonStates = () => {
    buttonsRef.current.forEach((button) => {
      button.classList.remove("correct", "incorrect");
    });
  };

  return (
    <div className="choices-container">
      {choices.map((choice, index) => (
        <ChoiceButton
          ref={(el: HTMLButtonElement) =>
            el && (buttonsRef.current[index] = el)
          }
          onClick={checkAnswer}
          key={index}
        >
          {choice}
        </ChoiceButton>
      ))}
    </div>
  );
}
