import React, { forwardRef } from 'react';
import { ReactNode } from 'react';
import './choices.css';

interface Props {
  children: ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ChoiceButton = forwardRef<HTMLButtonElement, Props>(({ children, onClick }: Props, ref) => {
  return (
    <button 
    onClick={onClick} 
    className="choice-btn" 
    ref={ref}
    aria-label={`Choose ${children}`}
    role='option'>
      {children}
    </button>
  );
});

export default ChoiceButton;
