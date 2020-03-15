import React, { Component } from 'react'
import './App.css'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Navbar from './components/Layout/Navbar'
import NotFound from './pages/notFound'
import Home from './pages/home'
import Signup from './pages/signup'
import Login from './pages/login'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

// * Redux
import {Provider} from 'react-redux'
import store from './redux/store'
import {getUserData} from './redux/actions/userActions'

// * Mui
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import MuiThemeProvider from '@material-ui/styles/ThemeProvider'
import themeUtil from './utils/theme'

const theme = createMuiTheme(themeUtil)

let authenticated;
const token = localStorage.token;

if(token) {
  const decoded = jwtDecode(token)

  if(new Date(decoded.exp * 1000) < new Date()) {
    // !EXPIRED
    authenticated = false;
  } else {
    authenticated = true;
    axios.defaults.headers.common['Authorization'] = `${token}`;
    store.dispatch(getUserData())
  }
}

class App extends Component {
  render() {
    let authNavbar = authenticated ? (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Redirect to="/"/>
      </Switch>
    ) : 
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/login" component={Login}/>
      <Route component={NotFound}/>
    </Switch>

    return (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
     <Router>
       <Navbar />
       {authNavbar}
     </Router>
    </MuiThemeProvider>
  </Provider>
    )
  }
}

export default App
