import { ADD_PLAYER, ADD_ASSERTIONS, COUNT_SCORE, CLEAN_ASSERTION } from '../action';

const INITTIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  email: '',
};

const player = (state = INITTIAL_STATE, action) => {
  switch (action.type) {
  case ADD_PLAYER:
    return {
      ...state,
      name: action.player.name,
      score: 0,
      email: action.player.email,
    };
  case ADD_ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  case COUNT_SCORE:
    return {
      ...state,
      score: action.score,
    };
  case CLEAN_ASSERTION:
    return {
      ...state,
      assertions: 0,
    };

  default:
    return state;
  }
};

export default player;
