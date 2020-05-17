const initialState = {
  get_data_in_progress: false,
  get_data_success: false,
  quiz_data: [],
  q_number: 1,
  correct_answers: 0
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "RESET_STATE": {
      return {
        ...state,
        q_number: 1,
        correct_answers: 0
      };
    }

    case "GET_DATA_IN_PROGRESS": {
      return {
        ...state,
        get_data_in_progress: true,
        get_data_success: false
      };
    }

    case "GET_DATA_IN_SUCCESS": {
      const { data } = action.payload;
      return {
        ...state,
        quiz_data: data,
        get_data_in_progress: false,
        get_data_success: true
      };
    }

    case "GET_DATA_IN_FAILURE": {
      return {
        ...state,
        get_data_in_progress: false,
        get_data_success: false
      };
    }

    case "MOVE_TO_NEXT_QUESTION": {
      const q_number = state.q_number + 1;
      const { is_answer_right } = action.payload;
      let correct_answers = state.correct_answers;
      if (is_answer_right) {
        correct_answers += 1;
      }
      return {
        ...state,
        correct_answers,
        q_number,
        get_data_in_progress: false,
        get_data_success: false
      };
    }

    default:
  }
  return state;
}
