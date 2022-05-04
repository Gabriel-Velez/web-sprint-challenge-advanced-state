import * as types from "./action-types";
import axios from "axios";

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise(value) {
  return { type: types.MOVE_CLOCKWISE, payload: value };
}

export function moveCounterClockwise(value) {
  return { type: types.MOVE_COUNTERCLOCKWISE, payload: value };
}

export function selectAnswer(answer_id) {
  return { type: types.SET_SELECTED_ANSWER, payload: answer_id };
}

export function setMessage(message) {
  return { type: types.SET_INFO_MESSAGE, payload: message };
}

export function setQuiz(question) {
  return { type: types.SET_QUIZ_INTO_STATE, payload: question };
}

export function inputChange(value) {
  return { type: types.INPUT_CHANGE, payload: value };
}

export function resetForm() {
  return {
    type: types.RESET_FORM,
    payload: { newQuestion: "", newTrueAnswer: "", newFalseAnswer: "" },
  };
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    dispatch({ type: types.SET_QUIZ_INTO_STATE, payload: null });
    axios
      .get("http://localhost:9000/api/quiz/next")
      .then((res) => {
        dispatch({ type: types.SET_QUIZ_INTO_STATE, payload: res.data });
      })
      .catch((err) => console.error({ err }));
  };
}
export function postAnswer(answer) {
  console.log(answer);
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz

    axios
      .post("http://localhost:9000/api/quiz/answer", answer)
      .then((res) => {
        console.log(res);
        dispatch({ type: types.SET_INFO_MESSAGE, payload: res.data.message });
        axios
          .get("http://localhost:9000/api/quiz/next")
          .then((resNext) => {
            dispatch({ type: types.SET_QUIZ_INTO_STATE, payload: resNext.data });
          })
          .catch((errNext) => console.error({ errNext }));
      })
      .catch((err) => console.error({ err }));
  };
}
export function postQuiz(answer) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    axios
      .post("http://localhost:9000/api/quiz/new", answer)
      .then((res) => {
        console.log(res);
        // dispatch({ type: types.SET_QUIZ_INTO_STATE, payload: res.data });
        dispatch({
          type: types.SET_INFO_MESSAGE,
          payload: `Congrats: "${answer.question_text}" is a great question!`,
        });
      })
      .catch((err) => console.error({ err }));
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
