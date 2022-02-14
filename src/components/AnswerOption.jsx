import React from "react";
import PropTypes from "prop-types";

function AnswerOption(props) {
  // console.log(props.answerType);
  // console.log(props.answerContent);

  return (
    <li className="answerOption">
      <input
        type="radio"
        className="radioCustomButton"
        name={props.answerContent}
        checked={props.answerType === props.answer}
        id={props.answerType}
        value={props.answerType}
        disabled={props.answer}
        onChange={props.onAnswerSelected}
      />
      <label className="radioCustomLabel" htmlFor={props.answerType}>
        {props.answerContent}
      </label>
    </li>
  );
}

AnswerOption.propTypes = {
  answerType: PropTypes.string.isRequired,
  answerContent: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
};

export default AnswerOption;
