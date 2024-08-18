import { Word } from "../types";

  export const parseCSV = (csvText: string): Word[] => {
    const lines = csvText.trim().split('\n'); // Split by line
    return lines.map(line => {
      const [hebrew, arabic] = line.split(';').map(item => item.trim());
      return { hebrew, arabic };
    });
  };