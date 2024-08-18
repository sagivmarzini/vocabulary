import { useEffect, useRef } from 'react';
import './choices.css';
import ChoiceButton from './ChoiceButton';

interface Props {
  choices: string[];
  checkAnswer: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Choices({ choices, checkAnswer }: Props) {
  const buttonsRef = useRef<HTMLButtonElement[]>([]);

  // Function to reset class names
  const resetClassNames = () => {
    buttonsRef.current.forEach(button => {
      button.classList.remove('correct', 'incorrect');
    });
  };

  useEffect(() => {
    resetClassNames(); // Reset class names whenever choices change
  }, [choices]);

  return (
    <div className='choices-container'>
      {choices.map((choice, index) => (
        <ChoiceButton
          ref={(el: any) => el && (buttonsRef.current[index] = el)}
          onClick={checkAnswer}
          key={index}
        >
          {choice}
        </ChoiceButton>
      ))}
    </div>
  );
}
