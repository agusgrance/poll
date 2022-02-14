import React, { Component } from "react";
import quizQuestions from "./api/quizQuestions";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import Header from "./components/Header";
import "./app.css";
import PDF from "./components/PDF";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      question: "",
      answerOptions: [],
      answer: "",
      answersCount: {},
      result: "",
      totalAnswer: [],
      totalAnswerContent: [],
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.handleAnswerContentSelected =
      this.handleAnswerContentSelected.bind(this);
  }
  _exportPdf = () => {
    function saveAs(uri, filename) {
      var link = document.createElement("a");
      if (typeof link.download === "string") {
        link.href = uri;
        link.download = filename;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
      } else {
        window.open(uri);
      }
    }
    html2canvas(document.querySelector(".ballot")).then((canvas) => {
      // document.body.appendChild(canvas); // if you want see your screenshot in body.

      /*PARA DESCARGAR COMO PDF */
      // const imgData = canvas.toDataURL("image/png");
      // var pdf = new jsPDF("p", "pt", [canvas.width, canvas.height]);

      // var width = pdf.internal.pageSize.getWidth();
      // var height = pdf.internal.pageSize.getHeight();
      // pdf.addImage(imgData, "JPEG", 0, 0, width, height);
      // pdf.save("Oscar-ballot.pdf");

      /*PARA DESCARGAR COMO PNG */
      saveAs(canvas.toDataURL(), "Oscar-ballot.png");
    });
  };

  componentDidMount() {
    const shuffledAnswerOptions = quizQuestions.map((question) =>
      this.shuffleArray(question.answers)
    );
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0],
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);
    this.setUserAnswerContent(event.currentTarget.name);

    if (this.state.questionId < quizQuestions.length) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }
  handleAnswerContentSelected(event) {
    this.setUserAnswerContent(event.currentTarget.value);
  }
  setUserAnswerContent(e) {
    this.state.totalAnswerContent.push(e);
  }

  setUserAnswer(answer) {
    this.state.totalAnswer.push(answer);
    this.setState((state, props) => ({
      answersCount: {
        ...state.answersCount,
        [answer]: (state.answersCount[answer] || 0) + 1,
      },
      answer: answer,
    }));
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: "",
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter(
      (key) => answersCount[key] === maxAnswerCount
    );
  }
  getResultsTotal() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);

    return answersCountKeys.filter((key) => answersCount[key] > 0);
  }
  getResultsTotalNumber() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);

    return answersCountValues;
  }

  setResults(result) {
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: this.getResults().join(" , ") });
    }
  }

  renderQuiz() {
    return (
      <>
        <Quiz
          answer={this.state.answer}
          answerOptions={this.state.answerOptions}
          questionId={this.state.questionId}
          question={this.state.question}
          questionTotal={quizQuestions.length}
          onAnswerSelected={this.handleAnswerSelected}
          quiz={quizQuestions}
          counter={this.state.counter}
          totalAnswer={this.state.totalAnswer}
        />
      </>
    );
  }

  renderResult() {
    const share = async function () {
      const canvas = await html2canvas(document.querySelector(".ballot"));
      canvas.toBlob(async (blob) => {
        const files = [new File([blob], "image.png", { type: blob.type })];
        const shareData = {
          files,
        };
        if (navigator.canShare(shareData)) {
          try {
            await navigator.share(shareData);
          } catch (err) {
            if (err.name !== "AbortError") {
              console.error(err.name, err.message);
            }
          }
        } else {
          console.warn("Sharing not supported", shareData);
        }
      });
    };
    return (
      <>
        <Result quizResult={this.state.result} />
        <div className="pdf_button">
          <button onClick={this._exportPdf}>Descargar</button>
          <button
            className="sharer-button"
            onClick={() => {
              share();
            }}
          >
            <span className="sharer-button-text">Compartir</span>
          </button>
        </div>

        <div className="pdf_content">
          <PDF totalAnswerContent={this.state.totalAnswerContent} />
        </div>
      </>
    );
  }

  render() {
    return (
      <div className="App">
        <Header />
        {this.state.result ? this.renderResult() : this.renderQuiz()}

        {/* <ul className="choices">
          {this.getResultsTotal().map((val) => {
            return <li className="choice_value">{val}</li>;
          })}
        </ul>
        <ul className="choices">
          {this.getResultsTotalNumber().map((val) => {
            return <li className="choice_count">{val}</li>;
          })}
        </ul> */}
      </div>
    );
  }
}

export default App;
