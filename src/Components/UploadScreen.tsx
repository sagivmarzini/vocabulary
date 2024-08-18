import { useRef } from 'react';
import './UploadScreen.css';
import { parseCSV } from '../Utils/fileUtils';
import { Word } from '../types';

interface UploadScreenProps {
  setWords: (words: Word[]) => void;
  startGame: () => void;
}

export default function UploadScreen({ setWords, startGame }: UploadScreenProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const csvText = e.target?.result as string;
                const parsedWords = parseCSV(csvText);
                setWords(parsedWords); // Update words in App component
                startGame(); // Start the game after parsing
            };
            
            reader.readAsText(file);
        }
    };

    return (
      <div className='upload-container'>
        <input
            type="file"
            ref={fileInputRef}
            accept=".csv"
            style={{ display: 'none' }}
            onChange={handleFile}
        />
        <button className="btn" onClick={handleButtonClick}>
            העלה קובץ
        </button>
      </div>
    );
}
