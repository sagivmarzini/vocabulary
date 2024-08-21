  import { useEffect, useRef } from 'react';
  import './choices.css';
  import ChoiceButton from './ChoiceButton';

  interface Props {
    choices: string[];
    checkAnswer: (event: React.MouseEvent<HTMLButtonElement>) => void;
  }

  export default function Choices({ choices, checkAnswer }: Props) {
    const buttonsRef = useRef<HTMLButtonElement[]>([]);

    // Map the buttons to the keyboard keys `q, w, a, s` respectively
    useEffect(() => {
      const handleKeyPress = (event: KeyboardEvent) => {
        const choiceButtons = document.querySelectorAll('.choice-btn') as NodeListOf<HTMLButtonElement>;
        let buttonToClick: HTMLButtonElement | null = null;
    
        switch (event.key) {
          case 'q':
            buttonToClick = choiceButtons[1];
            break;
          case 'w':
            buttonToClick = choiceButtons[0];
            break;
          case 'a':
            buttonToClick = choiceButtons[3];
            break;
          case 's':
            buttonToClick = choiceButtons[2];
            break;
          default:
            break;
        }
    
        if (buttonToClick) {
          buttonToClick.classList.add('active'); // Manually add the active class
          buttonToClick.click();
    
          setTimeout(() => {
            buttonToClick.classList.remove('active'); // Remove the active class after a short delay
          }, 150); // Adjust the delay to match your CSS transition duration
        }
      };
    
      window.addEventListener('keydown', handleKeyPress);
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }, []);

    useEffect(() => {
      resetClassNames(); // Reset class names whenever choices change
    }, [choices]);

    // Function to reset class names
    const resetClassNames = () => {
      buttonsRef.current.forEach(button => {
        button.classList.remove('correct', 'incorrect');
      });
    };

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
