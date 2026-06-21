import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteImage from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswers) {
    setUserAnswers((prev) => {
        return[
          ...prev,
          selectedAnswers
        ]
    })
  },[]);
  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null),[handleSelectAnswer]);
  if(quizIsComplete) {
    return (<div id="summary">
      <img src={quizCompleteImage}/>
      <h2>Quiz Summary</h2>
    </div>)
  }
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() =>Math.random()-0.5);
  return(
    <>
    <div id="quiz">
      <div id="question">
        <QuestionTimer time={10000} onTimeout={() => handleSelectAnswer(null)} />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers
          .map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  )
}