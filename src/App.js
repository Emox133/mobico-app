import React, { Component } from 'react'
import './App.css'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Navbar from './components/Layout/Navbar'
import NotFound from './pages/notFound'
import LandingPage from './pages/landingPage'
import Home from './pages/home'
import Signup from './pages/signup'
import Login from './pages/login'
import ResetPassword from './pages/resetPassword'

// * Redux
import {connect} from 'react-redux'

// * Mui
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import MuiThemeProvider from '@material-ui/styles/ThemeProvider'
import themeUtil from './utils/theme'

const theme = createMuiTheme(themeUtil)

class App extends Component {
  render() {
    let authNavbar = this.props.authenticated ? (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Redirect to="/"/>
      </Switch>
    ) : 
    <Switch>
      <Route exact path="/" component={LandingPage}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/login" component={Login}/>
      <Route path="/resetPassword/:token" component={ResetPassword}/>
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

const mapStateToProps = state => {
  return {
    authenticated: state.user.authenticated
  }
}

export default connect(mapStateToProps, null)(App)
