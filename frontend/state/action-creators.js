import * as types from "./action-types";
import axios from "axios";

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {}

export function moveCounterClockwise() {}

export function selectAnswer() {}

export function setMessage() {}

export function setQuiz() {}

export function inputChange() {}

export function resetForm() {}

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
      .post("http://localhost:9000/api/quiz/new", answer)
      .then((res) => {
        console.log(answer);
        dispatch({ type: types.SET_QUIZ_INTO_STATE, payload: res.data });
        dispatch({
          type: types.SET_INFO_MESSAGE,
          payload: `Congrats: "${answer.question_text}" is a great question!`,
        });
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
      .post("http://localhost:9000/api/quiz/answer", answer)
      .then((res) => {
        console.log(res);
        dispatch({ type: types.SET_INFO_MESSAGE, payload: res.data });
      })
      .catch((err) => console.error({ err }));
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
