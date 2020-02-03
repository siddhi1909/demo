// // IMPORT EXTERNAL LIBRARIES/MODULES
import {createStore} from 'redux';
// IMPORT ROOT REDUCER
import rootReducer from './reducer/rootReducer';

const initial_state = {};
// create the store
const store = createStore(rootReducer, initial_state);

export default store;
