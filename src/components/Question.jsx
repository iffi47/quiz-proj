import QuestionTimer from "./QuestionTimer";
import QUESTIONS from "../questions.js";
import Answers from "./Answers";
import { useContext, useState, useEffect } from "react";

export default function Question({
 onSelectAnswer,
 selectedAnswer,
 onSkipAnswer,
 index,
}) {
 const [answer, setAnswer] = useState({
  selectedAnswer: "",
  isCorrect: null,
 });
 let timer =10000;
  if(answer.selectedAnswer){
    timer=2000;
  }if(answer.isCorrect!==null){
    timer= 3000;
  }
 function handleSelectAnswer(answer) {
  setAnswer({
   selectedAnswer: answer,
   isCorrect: null,
  });
 }

 useEffect(() => {
  if (!answer.selectedAnswer) return;

  const timer1 = setTimeout(() => {
   setAnswer({
    selectedAnswer: answer.selectedAnswer,
    isCorrect: QUESTIONS[index].answers[0] === answer.selectedAnswer,
   });
   
  }, 1000);

  const timer2 = setTimeout(() => {
   onSelectAnswer(answer.selectedAnswer);
   answerState="answered"
  }, 3000);

  return () => {
   clearTimeout(timer1);
   clearTimeout(timer2);
  };
 }, [answer.selectedAnswer, index, onSelectAnswer]);
 let answerState = "";
 if (answer.selectedAnswer && answer.isCorrect!==null) {
  answerState = answer.isCorrect ? "correct" : "wrong";
 } else if(answer.selectedAnswer){
  answerState = "answered"
 }

 const question = QUESTIONS[index];
 if (!question) return <div>Quiz Complete!</div>;

 return (
  <>
   <div id="question">
    <QuestionTimer
     key={timer}
     time={timer}
     onTimeout={answer.selectedAnswer===''  ? onSkipAnswer: null }
     mode={answerState}
    />
    <h2>{question.text}</h2>
    <Answers
     answers={question.answers}
     selectedAnswer={answer.selectedAnswer}
     answerState={answerState}
     onSelect={handleSelectAnswer}
     disabled={answerState!==''}
    />
   </div>
  </>
 );
}