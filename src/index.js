import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './redux/store'
import {Provider} from 'react-redux'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import {getUserData} from './redux/actions/userActions'
import {LOGOUT_USER, SET_AUTHENTICATED} from './redux/types'

const app = (
    <Provider store={store}>
        <App />
    </Provider>
)

const token = localStorage.token;

if(token) {
  const decoded = jwtDecode(token)
  console.log(decoded)

  if(new Date(decoded.exp * 1000) < new Date()) {
    // !EXPIRED
    store.dispatch({type: LOGOUT_USER})
  } else {
    store.dispatch({type: SET_AUTHENTICATED})
    axios.defaults.headers.common['Authorization'] = `${token}`;
    store.dispatch(getUserData())
  }
}

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
