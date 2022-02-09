import React, { useState, useEffect } from "react";
import "../poll.css";

function Poll() {
  const [choice, setChoice] = useState("");
  const [results, setResults] = useState({});

  const vote = () => {
    if (!localStorage.getItem("vote-result")) {
      localStorage.setItem("vote-result", JSON.stringify({}));
    }
    setResults({ ...results, [choice]: (results[choice] ?? 0) + 1 });
  };

  useEffect(() => {
    localStorage.setItem("vote-result", JSON.stringify(results));
  }, [results]);
  return (
    <div className="poll">
      <form className="poll_form">
        <div className="poll_section">
          <h4 className="poll_Title">What's your favorite fruit?</h4>
          uva
          <input
            className="poll_Choice"
            type="radio"
            value="uva"
            checked={"uva" === choice}
            onChange={(e) => setChoice(e.target.value)}
          />
          <br />
          Manzana
          <input
            className="poll_Choice"
            type="radio"
            value="Manzana"
            checked={"Manzana" === choice}
            onChange={(e) => setChoice(e.target.value)}
          />
        </div>
      </form>
      <button className="poll_button" type="button" onClick={vote}>
        votar
      </button>
    </div>
    //     <div>
    //     <div>
    //       <h1>result</h1>
    //       {Object.entries(results).map(([key, val]) => {
    //         return (
    //           <p key={key}>
    //             {key}: {val}
    //           </p>
    //         );
    //       })}
    //     </div>
    //   </div>
  );
}

export default Poll;
