import {
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'), // default for the token in our state
  isAuthenticated: null, // boolean to indicate logged in status
  loading: true, // will set to false once we load the data
  user: null,
}

export default function(state = initialState, action) {
  const { type, payload } = action;
  
  switch(type) {
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token); // set the token in the state once logged in
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      }
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      }
    default:
      return state;
  }
}