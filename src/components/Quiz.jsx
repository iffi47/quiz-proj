import { useState, useCallback, useRef } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteImage from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

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

 return (
  <>
   <div id="quiz">
    <Question
    key={activeQuestionIndex}
     questionText={QUESTIONS[activeQuestionIndex].text}
     answers={QUESTIONS[activeQuestionIndex].answers}
     onSelectAnswer={handleSelectAnswer}
     answerState={answerState}
     selectedAnswer={userAnswers[userAnswers.length-1]}
     onSkipAnswer={handleSkipAnswer}
    />
   </div>
  </>
 );
}
