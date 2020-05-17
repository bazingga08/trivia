// url to retrive necessary data
const URL = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";
// function to retrive the necessary information from the provided URL
export function getData(payload) {
  return function somename(dispatch, getState) {
    // making state to progress to show the Loader
    dispatch({
      type: "GET_DATA_IN_PROGRESS",
      payload: {}
    });
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          // resetting the loader to necessary state after data recieved and assign recived data
          dispatch({
            type: "GET_DATA_IN_SUCCESS",
            payload: {
              data: data.results
            }
          });
        } else {
          // setting the necessary state changesin case of fail to retrive data
          dispatch({
            type: "GET_DATA_IN_FAILURE",
            payload: {}
          });
        }
      });
  };
}
// incresing the question number to move to the next question
export function increseQuestionNumber(payload) {
  return function somename(dispatch, getState) {
    dispatch({
      type: "MOVE_TO_NEXT_QUESTION",
      payload
    });
  };
}

// resetting the question number to start new quiz
export function resetQuestionNumber(payload) {
  return function somename(dispatch, getState) {
    dispatch({
      type: "RESET_STATE",
      payload
    });
  };
}
