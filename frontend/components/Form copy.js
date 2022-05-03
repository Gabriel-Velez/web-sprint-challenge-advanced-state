import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../state/action-creators";
const initialFormValues = { newQuestion: "", newTrueAnswer: "", newFalseAnswer: "" };

export function Form(props) {
  const { postAnswer, inputChange, form } = props;
  const [values, setValues] = useState(initialFormValues);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    console.log(form);
    setValues(form);
  }, []);

  const onChange = (evt) => {
    const { id, value } = evt.target;
    setValues({ ...values, [id]: value });
    inputChange({ [id]: value });
    const newQuestion =
      document.querySelector("#newQuestion").value.trim().length > 0 ? true : false;
    const newTrueAnswer =
      document.querySelector("#newTrueAnswer").value.trim().length > 0 ? true : false;
    const newFalseAnswer =
      document.querySelector("#newFalseAnswer").value.trim().length > 0 ? true : false;

    newQuestion && newTrueAnswer && newFalseAnswer ? setDisabled(false) : setDisabled(true);
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
        value={form.newQuestion}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id='newTrueAnswer'
        placeholder='Enter true answer'
        value={form.newTrueAnswer}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id='newFalseAnswer'
        placeholder='Enter false answer'
        value={form.newFalseAnswer}
      />
      <button id='submitNewQuizBtn' disabled={disabled}>
        Submit new quiz
      </button>
    </form>
  );
}

export default connect((st) => st, actionCreators)(Form);
