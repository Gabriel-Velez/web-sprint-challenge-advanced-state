import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../state/action-creators";

function Quiz(props) {
  const { quiz, fetchQuiz, postAnswer } = props;

  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const submitQuiz = () => {
    setSubmitDisabled(true);
    const answers = document.querySelectorAll("#quizAnswers .answer");
    const selectedAnswer = document.querySelector("#quizAnswers .selected");
    answers.forEach((answer) => {
      answer.classList.remove("selected");
      answer.lastChild.innerHTML = "Select";
    });

    let trueAnswer;
    let falseAnswer;

    // if (answers[0] === selectedAnswer) {
    //   trueAnswer = "yes";
    //   falseAnswer = "nah";
    // } else {
    //   trueAnswer = "nah";
    //   falseAnswer = "yes";
    // }

    // const sentAnswer = {
    //   question_text: quiz.question,
    //   true_answer_text: trueAnswer,
    //   false_answer_text: falseAnswer,
    // };

    let sentAnswer;
    // if (answers[0] === selectedAnswer) {
    sentAnswer = { question_text: "Love JS?", true_answer_text: "yes", false_answer_text: "nah" };
    // } else {
    //   trueAnswer = "nah";
    //   falseAnswer = "yes";
    // }

    console.table(sentAnswer);
    console.log(sentAnswer);
    postAnswer(sentAnswer);
  };
  const selectAnswer = (idx) => {
    const answers = document.querySelectorAll("#quizAnswers .answer");
    answers.forEach((answer) => {
      answer.classList.remove("selected");
      answer.lastChild.innerHTML = "Select";
    });
    answers[idx].classList.add("selected");
    answers[idx].lastChild.innerHTML = "SELECTED";
    setSubmitDisabled(false);
  };

  return (
    <div id='wrapper'>
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
