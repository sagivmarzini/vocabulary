import './Stats.css'

interface Props {
    score: number,
    streak: number,
    level: number
}

export default function Stats({ score, streak, level}: Props) {
  return (
    <div className="stats-container">
      <div className="stat">ניקוד: {score}</div>
      <div className="stat">רצף: {streak}</div>
      <div className="stat">רמה: {level}</div>
    </div>
  )
}
