import { ReactNode, useEffect, useRef } from 'react'
import './SourceWord.css'

interface Props {
    children: ReactNode
}

export default function SourceWord({ children}: Props) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    textRef.current?.animate([
        {transform: 'translateY(100%)'},
        {transform: 'none'}
      ], {
        duration: 500,
        easing: 'ease'
      })
  }, [children])

  return (
    <>
        <div className='word-container'>
          <div className="word-mask">
            <div className="word" ref={textRef} >{children}</div>
          </div>
        </div>
    </>
  )
}
