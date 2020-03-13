import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Navbar from './components/Layout/Navbar'
import Home from './pages/home'
import Signup from './pages/signup'
import Login from './pages/login'
import NotFound from './pages/notFound'
import axios from 'axios'
import './App.css'
import jwtDecode from 'jwt-decode'

// * Mui
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import MuiThemeProvider from '@material-ui/styles/ThemeProvider'
import themeUtil from './utils/theme'

const theme = createMuiTheme(themeUtil)

let authenticated;
const token = localStorage.token;
const decoded = jwtDecode(token)
console.log(decoded)

if(new Date(decoded.exp * 1000) < new Date()) {
  // !EXPIRED
  authenticated = false;
} else {
  authenticated = true;
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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
    <MuiThemeProvider theme={theme}>
     <Router>
       <Navbar />
       {authNavbar}
     </Router>
    </MuiThemeProvider>
    )
  }
}

export default App
