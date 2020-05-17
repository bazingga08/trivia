// @flow

import React, { Component } from "react";
import { connect } from "react-redux";

// importing the style from the external css file
import "./testScreen.css";

// importing necessary sub-components
import Puzzle from "../Puzzle";

const stateMap = store => ({
  dataReducer: store.dataReducer
});
// declaring the type of props and states used in this component
type Props = {};
type State = {
  quizData: Array<Object>
};

class TestScreen extends Component<Props, State> {
  constructor(props) {
    super(props);
    //  initialising necessary states
    this.state = {
      quizData: this.props.dataReducer.quiz_data
    };
  }

  render() {
    // displaying test screen if question exists and passing necessary data to sub-components
    if (
      this.props.dataReducer.q_number <= 9 &&
      this.state.quizData[this.props.dataReducer.q_number] &&
      this.state.quizData[this.props.dataReducer.q_number].question
    ) {
      return (
        <div className="question-box">
          <Puzzle
            question={
              this.state.quizData[this.props.dataReducer.q_number].question
            }
            correct_answer={
              this.state.quizData[this.props.dataReducer.q_number]
                .correct_answer
            }
            incorrect_answers={
              this.state.quizData[this.props.dataReducer.q_number]
                .incorrect_answers
            }
          />
        </div>
      );
    }
    // displaying goodbye screen if answered all question exists and displaying results
    return (
      <div className="goodbye-screen">
        <img
          src="https://cdn.pixabay.com/photo/2017/01/28/11/43/cup-2015198_960_720.png"
          alt="trophie"
          style={{ height: "150px" }}
        />
        <div>YAY</div>
        <div style={{ fontSize: 40, marginBottom: 50 }}>
          You Scored
          <span style={{ fontWeight: "bold", marginLeft: 10 }}>
            {this.props.dataReducer.correct_answers}/
            {this.state.quizData.length}
          </span>
        </div>
        <div className="goodbye-slection">
          wanna try again ?
          <div className="goodbye-buttons">
            <div className="cancel-button" onClick={this.props.cancelTest}>
              Nope
            </div>
            <div className="yes-button" onClick={this.props.startTest}>
              Yes
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(stateMap)(TestScreen);
