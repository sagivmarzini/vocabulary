import { useRef } from 'react';
import './UploadScreen.css';
import { parseCSV } from '../Utils/fileUtils';
import { VocabFile, Word } from '../types';

interface Props {
  setWords: (words: Word[]) => void;
  startGame: () => void;
}

const vocabFiles: VocabFile[] = [
    { name: "מדרסה", path: './vocabulary-files/madrasa.csv'},
    { name: "מילים פופולריות", path: './vocabulary-files/most-searched-words.csv'},
    { name: "שמות עצם", path: './vocabulary-files/nouns.csv'},
    { name: "מילות יחס וקישור", path: './vocabulary-files/prepositions.csv'},
    { name: "פעלים", path: './vocabulary-files/verbs.csv'},
    { name: "אוצר מילים", path: './vocabulary-files/vocabulary.csv'},
]

export default function UploadScreen({ setWords, startGame }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const fileDropdownRef = useRef<HTMLSelectElement>(null);

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

    function loadPredefinedFile() {
        const file = fileDropdownRef.current!.value;

        fetch(file)
        .then(response => response.text())
        .then(data => {
            const words = parseCSV(data);
            setWords(words);
            startGame();
        })
        .catch(error => console.error('Error fetching the file:', error));
    }

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
        <h2>או</h2>
        <div className="select-file-container">
            <select name="select-file" id="select-file" ref={fileDropdownRef}>
                {vocabFiles.map((file, index) => <option key={index} value={file.path}>{file.name}</option>)}
            </select>
            <button className='select-file-btn' onClick={loadPredefinedFile}>בחר</button>
        </div>
      </div>
    );
}
