import { ReactNode, useEffect, useRef } from 'react'
import './SourceWord.css'

interface Props {
    children: ReactNode
}

export default function SourceWord({ children}: Props) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fade-in from bottom animation
    // textRef.current?.animate([
    //   {transform: 'translateY(50%)', opacity: 0, /* letterSpacing: '5px' */},
    //   {tranform: 'none'}
    // ], {
    //   duration: 300,
    //   easing: 'ease'
    // })
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
            <div className="word" ref={textRef} >{children}</div>
            {/* <div className="hiding-box"></div> */}
        </div>
    </>
  )
}
