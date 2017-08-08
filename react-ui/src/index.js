import React from 'react';
import ReactDOM from 'react-dom';
import App from './container/App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import axios from 'axios';

import AdminReducer from './reducers/admin';
import './stylesheets/index.css';
import './stylesheets/buttons.css';

import {initialUser, initialEdit, initialMessage, initialRate, messages } from '../../data/data';
//=============================================================\

const initialState = {
  edit: initialEdit,
  message: initialMessage,
  user: initialUser,
  rate: initialRate
};

const saveState = (state) => {
  try {
    if(state.message.error !== "Session expired. Log back in again to continue."){
      const serializedState = JSON.stringify(state);
      localStorage.setItem('patty', serializedState);
    }
    else { //do not save session if logged out
      const serializedInitial = JSON.stringify(initialState);
      localStorage.setItem('patty', serializedInitial);
    }
  }
  catch(err){

  }
};

// const storage = JSON.parse(localStorage.patty);
const initial = (localStorage.patty !== undefined) ? JSON.parse(localStorage.patty) : initialState;

const store = createStore(
  AdminReducer, {...initial, rate: initialRate, message: initialMessage}, applyMiddleware(thunk)
);

store.subscribe(() => { saveState(store.getState()); });


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
