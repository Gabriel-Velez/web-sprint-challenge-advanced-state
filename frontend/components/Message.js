import React from "react";
import { connect } from "react-redux";
import * as actions from "../state/action-creators";

function Message(props) {
  const { infoMessage } = props;
  return <div id='message'>{infoMessage}</div>;
}

export default connect((state) => state, actions)(Message);
