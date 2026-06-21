import { useState, useCallback, useRef } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteImage from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

export default function Quiz() {
 const [userAnswers, setUserAnswers] = useState([]);
 const activeQuestionIndex = userAnswers.length;
 const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
 const handleSelectAnswer = useCallback(
  function handleSelectAnswer(selectedAnswers) {
   setUserAnswers((prev) => {
    return [...prev, selectedAnswers];
   });
  },
  [],
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

 return (
  <>
   <div id="quiz">
    <Question
    key={activeQuestionIndex}
    index={activeQuestionIndex}
     onSelectAnswer={handleSelectAnswer}
     onSkipAnswer={handleSkipAnswer}
    />
   </div>
  </>
 );
}
