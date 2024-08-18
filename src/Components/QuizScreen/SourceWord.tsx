import { ReactNode } from 'react'
import './SourceWord.css'

interface Props {
    children: ReactNode
}

export default function SourceWord({ children}: Props) {
  return (
    <>
        <div className='word-container'>
            <div className="word">{children}</div>
            {/* <div className="hiding-box"></div> */}
        </div>
    </>
  )
}
