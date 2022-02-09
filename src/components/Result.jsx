import React from "react";
import PropTypes from "prop-types";
import { TransitionGroup } from "react-transition-group";

function Result(props) {
  return (
    <TransitionGroup
      className="container result"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div>
        {props.quizResult ? (
          <p>
            Tu pelicula candidata a ganar todo es:
            <strong> {props.quizResult}</strong>!
          </p>
        ) : (
          <p>
            Al parecer tenes varias favoritas para este año!
            <strong> {props.quizResult}</strong>!
          </p>
        )}
      </div>
    </TransitionGroup>
  );
}

Result.propTypes = {
  quizResult: PropTypes.string.isRequired,
};

export default Result;
