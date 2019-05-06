import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types';

// Register User
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }

  const body = JSON.stringify({ name, email, password }) // preparing the data to send

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data // we get a token back on a successful response
    })
  } catch(err) {
    const errors = err.response.data.errors; // response returns an errors array

    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL // we don't need a payload bc we don't do anything w a payload in auth reducer in this case
    })
  }
}