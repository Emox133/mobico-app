import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/Layout/Navbar'
import Home from './pages/home'
import Signup from './pages/signup'
import Login from './pages/login'
import NotFound from './pages/notFound'
import './App.css'

// * Mui
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import MuiThemeProvider from '@material-ui/styles/ThemeProvider'
import themeUtil from './utils/theme'

const theme = createMuiTheme(themeUtil)

class App extends Component {
  render() {
    return (
    <MuiThemeProvider theme={theme}>
     <Router>
       <Navbar />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/login" component={Login}/>
        <Route component={NotFound}/>
      </Switch>
     </Router>
    </MuiThemeProvider>
    )
  }
}

export default App
