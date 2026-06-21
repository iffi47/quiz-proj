import quizCompleteImage from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js"

export default function Summary({userAnswers}) {
  const skippedAnswers= userAnswers.filter(answer => answer ===null);
  const correctAnswers= userAnswers.filter((answer, index) => answer===QUESTIONS[index].answers[0]);
  const skippedAnswerShare= Math.round((skippedAnswers.length/userAnswers.length)*100);
  const correctAnswerShare= Math.round((correctAnswers.length/userAnswers.length)*100);
  const wrongAnswersShare= 100-skippedAnswerShare-correctAnswerShare;
  return (
    <>
      <div id="summary">
        <img src={quizCompleteImage} />
        <h2>Quiz Summary</h2>
        <div id="summary-stats"> 
          <p>
            <span className="number">{skippedAnswerShare} %</span>
            <span className="text">Skipped</span>
          </p>
          <p>
            <span className="number">{correctAnswerShare} %</span>
            <span className="text">Correct</span>
          </p>
          <p>
            <span className="number">{wrongAnswersShare} %</span>
            <span className="text">Wrong Answers</span>
          </p>
        </div>
        <ol>
          {userAnswers.map((answer, index) =>{
            let cssClass= 'user-answer';
            if(answer===null){
              cssClass += 'skipped';
            }else if(answer===QUESTIONS[index].answers[0]){
              cssClass+='correct'
            }else{
              cssClass+='wrong'
            }
            return(
            <li key={index}>
              <h3>{index+1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ? answer : "Skipped"}</p>
            </li>
            )
          })}
        </ol>
      </div>
    </>
  )
}