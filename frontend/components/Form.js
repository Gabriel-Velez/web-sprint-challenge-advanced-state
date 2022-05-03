import React, { useState } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../state/action-creators";
const initialFormValues = { newQuestion: "", newTrueAnswer: "", newFalseAnswer: "" };

export function Form(props) {
  const { postAnswer } = props;
  const [values, setValues] = useState(initialFormValues);
  const [disabled, setDisabled] = useState(true);

  const onChange = (evt) => {
    const { id, value } = evt.target;
    setValues({ ...values, [id]: value });
    const newQuestion = document.querySelector("#newQuestion").value.length > 0 ? true : false;
    const newTrueAnswer = document.querySelector("#newTrueAnswer").value.length > 0 ? true : false;
    const newFalseAnswer =
      document.querySelector("#newFalseAnswer").value.length > 0 ? true : false;

    if (newQuestion && newTrueAnswer && newFalseAnswer) setDisabled(false);
    else setDisabled(true);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    const theQuestion = {
      question_text: values.newQuestion,
      true_answer_text: values.newTrueAnswer,
      false_answer_text: values.newFalseAnswer,
    };
    postAnswer(theQuestion);
    console.table(theQuestion);
    setValues(initialFormValues);
    setDisabled(true);
  };

  return (
    <form id='form' onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        onChange={onChange}
        id='newQuestion'
        placeholder='Enter question'
        value={values.newQuestion}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id='newTrueAnswer'
        placeholder='Enter true answer'
        value={values.newTrueAnswer}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id='newFalseAnswer'
        placeholder='Enter false answer'
        value={values.newFalseAnswer}
      />
      <button id='submitNewQuizBtn' disabled={disabled}>
        Submit new quiz
      </button>
    </form>
  );
}

export default connect((st) => st, actionCreators)(Form);
