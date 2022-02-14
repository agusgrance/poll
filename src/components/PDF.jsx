import React from "react";
import QuizQ from "../api/quizQuestions";
import Header from "./Header";
import "../pdf.css";
function PDF(props) {
  return (
    <div className="ballot">
      <Header />
      {QuizQ.map((index, key) => (
        <div key={key} className="categorie">
          <h4 className="categorie_title">
            {/* {index.id} */}
            {index.question}
            {/* {props.totalAnswer[index.id]} */}
          </h4>
          {/* {index.answers.map(ShowAnswerOptions)} */}
          <div className="categorie_item">
            {index.answers.map((val, key) => (
              <p key={key}>
                {props.totalAnswerContent[index.id] == val.content ? (
                  <strong key={key} className="categorie_selected">
                    {val.content}
                  </strong>
                ) : (
                  <div key={key}>{val.content}</div>
                )}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PDF;
