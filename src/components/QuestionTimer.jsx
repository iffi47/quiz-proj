import { useState, useEffect } from "react";

export default function QuestionTimer ({time, onTimeout, mode}) {
  const [remainingTime, setRemainingTime] = useState(time);
  useEffect(() =>{
    const timerRef=setTimeout(() => onTimeout, time);
    return () =>{
      clearTimeout(timerRef);
    }
  },[onTimeout, time])
  useEffect(() =>{
    const interval=setInterval(() => {
    setRemainingTime(prev => prev-100);
    },100)
    return( ) =>{
      clearInterval(interval)
    }
  },[])
  return(
    <>
      <progress id="question-time" max={time} value={remainingTime} className={mode}>

      </progress>
    </>
  )
}