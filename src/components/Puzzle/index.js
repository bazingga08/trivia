// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import { unescape } from "html-escaper";

// importing necessary action for increasing the question number
import { increseQuestionNumber } from "../../actions/dataAction.js";

// importing the style from the external css file
import "./puzzle.css";

const stateMap = store => ({
  dataReducer: store.dataReducer
});

// declaring the type of props and states used in this component
type Props = {};
type State = {
  correct_answer: string,
  answers: Array<string>,
  selectedAnswer: string,
  timer: number
};

class Puzzle extends Component<Props, State> {
  constructor(props) {
    super(props);
    //  initialising necessary states
    this.state = {
      correct_answer: "",
      answers: [],
      selectedAnswer: "",
      timer: 15
    };

    //  binding all the necessary functions to perform state operations
    (this: any).onAnswerClick = this.onAnswerClick.bind(this);
    (this: any).startTimer = this.startTimer.bind(this);
  }

  //  Assigning necessary data to the states recieved from parent
  componentDidMount() {
    const correct_answer = this.props.correct_answer;
    let answers = [...this.props.incorrect_answers, this.props.correct_answer]
      .map(a => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map(a => a.value);
    this.setState(prevState => ({
      correct_answer,
      answers
    }));
    this.questionTimer = setInterval(() => {
      this.startTimer();
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    //  resetting the data of answers to avoid collison from prev question
    if (this.props.dataReducer.q_number !== prevProps.dataReducer.q_number) {
      clearInterval(this.questionTimer);
      const correct_answer = this.props.correct_answer;
      let answers = [...this.props.incorrect_answers, this.props.correct_answer]
        .map(a => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value);
      this.setState(prevState => ({
        correct_answer,
        answers,
        selectedAnswer: "",
        timer: 15
      }));
      this.questionTimer = setInterval(() => {
        this.startTimer();
      }, 1000);
    }
    // showing the answer after timeout of a question if option not selected
    if (this.state.timer === 0 && prevState.timer !== this.state.timer) {
      clearInterval(this.questionTimer);
      this.setState(prevState => ({
        selectedAnswer: "not_selected"
      }));
      setTimeout(() => {
        this.props.dispatch(
          increseQuestionNumber({
            is_answer_right: false
          })
        );
      }, 2000);
    }
  }

  //  perform necessary state changes on click of the answer
  onAnswerClick(e) {
    if (!this.state.selectedAnswer || this.state.selectedAnswer.length === 0) {
      clearInterval(this.questionTimer);
      const index = e.target.id;
      this.setState(prevState => ({
        selectedAnswer: this.state.answers[index]
      }));
      let is_answer_right =
        this.state.answers[index] === this.state.correct_answer;
      setTimeout(() => {
        this.props.dispatch(
          increseQuestionNumber({
            is_answer_right
          })
        );
      }, 2000);
    }
  }

  // tracking the timer on start of a new question
  startTimer() {
    let timer = this.state.timer - 1;
    if (timer >= 0) {
      this.setState(state => ({
        timer
      }));
    }
  }
  //  displaying the question and answers for a particular question and result for selected answer
  render() {
    return (
      <div className="question-container">
        <div className="metadata-section">
          <div className="round-section">
            Round {this.props.dataReducer.q_number}/
            {this.props.dataReducer.quiz_data &&
              this.props.dataReducer.quiz_data.length}
          </div>
          <div className="timer-section">00:{this.state.timer}</div>
        </div>
        <div className="question-section">
          <div className="question-title">
            {unescape(this.props.question.replace("&rsquo;", "'"))}
          </div>
          <div className="answer-section">
            {this.state.answers.map((ans, index) => (
              <div
                className="answer-title"
                style={{
                  background:
                    this.state.selectedAnswer &&
                    this.state.selectedAnswer.length
                      ? this.state.selectedAnswer ===
                          this.state.correct_answer &&
                        this.state.selectedAnswer === ans
                        ? "#78FFB0"
                        : this.state.selectedAnswer !==
                            this.state.correct_answer &&
                          this.state.selectedAnswer === ans
                        ? "#F25043"
                        : this.state.correct_answer === ans
                        ? "#78FFB0"
                        : "#ffeb91"
                      : "#ffeb91"
                }}
                key={index}
                id={index}
                onClick={this.onAnswerClick}
              >
                {unescape(ans.replace("&rsquo;", "'"))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(stateMap)(Puzzle);
