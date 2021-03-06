import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './redux/store'
import {Provider} from 'react-redux'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import {getUserData, getMyFriendRequests, friends, friendRequestsIreceivedAndAccepted} from './redux/actions/userActions'
import {LOGOUT_USER} from './redux/types'

const app = (
    <Provider store={store}>
        <App />
    </Provider>
)

const token = localStorage.token;

if(token) {
  const decoded = jwtDecode(token)

  if(new Date(decoded.exp * 1000) < new Date()) {
    // !EXPIRED
    store.dispatch({type: LOGOUT_USER})
  } else {
    // store.dispatch({type: SET_AUTHENTICATED})
    axios.defaults.headers.common['Authorization'] = `${token}`;
    store.dispatch(getUserData())
    store.dispatch(friends())
    store.dispatch(getMyFriendRequests())
    store.dispatch(friendRequestsIreceivedAndAccepted())
  }
}

ReactDOM.render(app, document.getElementById('root'));

