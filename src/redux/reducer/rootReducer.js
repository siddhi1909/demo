// IMPORT EXTERNAL LIBRARIES/MODULES
import { combineReducers } from 'redux';

// IMPORT OTHER REDUCERS
import authReducer from './authReducer';

const reducers = {
  auth: authReducer
};

export default combineReducers(reducers);
