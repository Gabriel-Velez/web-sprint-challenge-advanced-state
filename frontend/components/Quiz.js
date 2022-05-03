import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../state/action-creators";

function Quiz(props) {
  const { quiz, fetchQuiz, postQuiz } = props;

  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [selectAnswerState, setSelectedAnswerState] = useState(null);

  useEffect(() => {
    if (quiz === null) fetchQuiz();
  }, []);

  const selectAnswer = (idx) => {
    const answers = document.querySelectorAll("#quizAnswers .answer");
    answers.forEach((answer) => {
      answer.classList.remove("selected");
      answer.lastChild.innerHTML = "Select";
    });
    answers[idx].classList.add("selected");
    answers[idx].lastChild.innerHTML = "SELECTED";
    setSubmitDisabled(false);
    setSelectedAnswerState(quiz.answers[idx].answer_id);
  };

  const submitQuiz = () => {
    setSubmitDisabled(true);
    const answers = document.querySelectorAll("#quizAnswers .answer");
    answers.forEach((answer) => {
      answer.classList.remove("selected");
      answer.lastChild.innerHTML = "Select";
    });
    let sentAnswer;
    sentAnswer = { quiz_id: quiz.quiz_id, answer_id: selectAnswerState };
    console.table(sentAnswer);
    postQuiz(sentAnswer);
    console.log("before ", quiz);
    fetchQuiz();
    console.log("after ", quiz);
  };
  return (
    <div id='wrapper'>
      {console.log(quiz)}
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id='quizAnswers'>
              <div className='answer'>
                {quiz.answers[0].text}
                <button onClick={() => selectAnswer(0)}>Select</button>
              </div>

              <div className='answer'>
                {quiz.answers[1].text}
                <button onClick={() => selectAnswer(1)}>Select</button>
              </div>
            </div>

            <button id='submitAnswerBtn' onClick={submitQuiz} disabled={submitDisabled}>
              Submit answer
            </button>
          </>
        ) : (
          "Loading next quiz..."
        )
      }
    </div>
  );
}

export default connect((state) => state, actions)(Quiz);
