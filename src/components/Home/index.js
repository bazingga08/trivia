// @flow

import React, { Component } from "react";
import { connect } from "react-redux";

// importing necessary action for retriving th data and resetting the whole state
import { getData, resetQuestionNumber } from "../../actions/dataAction";

// importing necessary sub-components
import TestScreen from "../TestScreen";
import Loader from "../Loader";

// importing the style from the external css file
import "./home.css";

const stateMap = store => ({
  dataReducer: store.dataReducer
});
// declaring the type of props and states used in this component
type Props = {
  dataReducer: {
    quiz_data: Array<Object>,
    get_data_in_progress: boolean,
  }
};
type State = {
  is_testStarted: boolean,
};

class Home extends Component<Props, State> {
  constructor(props) {
    super(props);
    //  initialising necessary states
    this.state = {
      is_testStarted: false
    };
    //  binding all the necessary functions to perform state operations
    (this: any).startTest = this.startTest.bind(this);
    (this: any).cancelTest = this.cancelTest.bind(this);
  }

  componentDidMount() {
    // calling getdata Action to retrive necessary data
    this.props.dispatch(getData({}));
  }

  // starting trivia quiz by performing necessary state operations
  startTest() {
    // resetting the necessary states before starting the test
    this.props.dispatch(resetQuestionNumber({}));
    // necessary state operations
    this.setState(prevState => ({
      is_testStarted: true
    }));
  }
  // stoping trivia quiz by performing necessary state operations
  cancelTest() {
    // necessary state operations
    this.setState(prevState => ({
      is_testStarted: false
    }));
  }

  render() {
    // displaying Test Screen if test is started
    if (this.state.is_testStarted) {
      return <TestScreen startTest={this.startTest} cancelTest={this.cancelTest} />;
    }
    let quiz_data = this.props.dataReducer.quiz_data[0];
    // displaying welcome Screen if test is not started
    return (
      <div className="container">
        {this.props.dataReducer.get_data_in_progress ? (
          <Loader />
        ) : (
          <div className="welcome-screen">
            <div className="welcome-title">
              Are you Ready to test your
              <span style={{ color: "#FAF9C5", display: "inline", margin: '0px 10px' }}>
                 "{quiz_data ? quiz_data.category : null}"
              </span>
              ?
            </div>
            <div className="welcome-body">
              <div className="welcome-notes">
                <div>Important Notes</div>
                <div style={{ display: "flex" }}>
                  <span style={{ marginRight: 5 }}>-</span>
                  You will be given with 10 questions to answer
                </div>
                <div style={{ display: "flex" }}>
                  <span style={{ marginRight: 5 }}>-</span>
                  <div>
                    You will be given with 15 second for each question to be answered
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <span style={{ marginRight: 5 }}>-</span>
                  You will be able to select answer only once for each question
                </div>
              </div>
              <div className="start-button" onClick={this.startTest}>
                Start
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(stateMap)(Home);
