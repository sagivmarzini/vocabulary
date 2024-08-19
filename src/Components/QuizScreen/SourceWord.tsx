import { ReactNode, useEffect, useRef } from 'react'
import './SourceWord.css'

interface Props {
    children: ReactNode
}

export default function SourceWord({ children}: Props) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    playAppearAnimation(textRef.current)
  }, [children])

  function playAppearAnimation(element: HTMLElement | null) {
    element?.animate([
      {transform: 'translateY(100%)'},
      {transform: 'none'}
    ], {
      duration: 500,
      easing: 'ease'
    })
  }

  return (
    <>
        <div className='word-container'>
          <div className="word-mask">
            <div className="word" ref={textRef} onClick={() => playAppearAnimation(textRef.current)}>{children}</div>
          </div>
        </div>
    </>
  )
}
