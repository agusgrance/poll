import React from "react";
import PropTypes from "prop-types";

function Result(props) {
  return (
    <div className="container result">
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
    </div>
  );
}

Result.propTypes = {
  quizResult: PropTypes.string.isRequired,
};

export default Result;
