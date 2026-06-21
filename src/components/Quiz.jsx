import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteImage from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("");
  const activeQuestionIndex =
   answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
  const handleSelectAnswer = useCallback(
   function handleSelectAnswer(selectedAnswers) {
    setAnswerState("answered");
    setUserAnswers((prev) => {
     return [...prev, selectedAnswers];
    });
    setTimeout(() => {
     if (selectedAnswers === QUESTIONS[activeQuestionIndex].answers[0]) {
      setAnswerState("correct");
     } else {
      setAnswerState("wrong");
     }
     setTimeout(() => {
      setAnswerState("");
     }, 2000);
    }, 1000);
   },
   [activeQuestionIndex],
  );
  const handleSkipAnswer = useCallback(
   () => handleSelectAnswer(null),
   [handleSelectAnswer],
  );
  if (quizIsComplete) {
   return (
    <div id="summary">
     <img src={quizCompleteImage} />
     <h2>Quiz Summary</h2>
    </div>
   );
  }
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);
  return (
   <>
    <div id="quiz">
     <div id="question">
      <QuestionTimer
       key={activeQuestionIndex}
       time={10000}
       onTimeout={() => handleSelectAnswer(null)}
      />
      <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
      <ul id="answers">
       {shuffledAnswers.map((answer) => (
        <li
         key={answer}
         className="answer">
         <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
        </li>
       ))}
      </ul>
     </div>
    </div>
   </>
  );
}