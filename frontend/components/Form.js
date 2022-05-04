import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../state/action-creators";
const initialFormValues = { newQuestion: "", newTrueAnswer: "", newFalseAnswer: "" };

export function Form(props) {
  const { postQuiz, resetForm, form } = props;
  const [values, setValues] = useState(initialFormValues);
  const [disabled, setDisabled] = useState(true);

  // useEffect(() => {
  //   console.log(form);
  //   setValues(form);
  // }, []);

  const checkDisabled = () => {
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
    postQuiz({
      question_text: form.newQuestion,
      true_answer_text: form.newTrueAnswer,
      false_answer_text: form.newFalseAnswer,
    });
    setDisabled(true);
    resetForm();
  };

  return (
    <form id='form' onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        onChange={(e) => {
          props.inputChange({ ...form, newQuestion: e.target.value });
          checkDisabled();
        }}
        id='newQuestion'
        placeholder='Enter question'
        value={form.newQuestion}
      />
      <input
        maxLength={50}
        onChange={(e) => {
          props.inputChange({ ...form, newTrueAnswer: e.target.value });
          checkDisabled();
        }}
        id='newTrueAnswer'
        placeholder='Enter true answer'
        value={form.newTrueAnswer}
      />
      <input
        maxLength={50}
        onChange={(e) => {
          props.inputChange({ ...form, newFalseAnswer: e.target.value });
          checkDisabled();
        }}
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

const mapStateToProps = (state) => {
  return {
    newQuestion: state.form.newQuestion,
    newTrueAnswer: state.form.newTrueAnswer,
    newFalseAnswer: state.form.newFalseAnswer,
  };
};
export default connect((st) => st, actionCreators)(Form);
