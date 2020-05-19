import React from 'react'
import './App.css'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Navbar from './components/Layout/Navbar'
import NotFound from './pages/notFound'
// import LandingPage from './pages/landingPage'
import Home from './pages/home'
import Signup from './pages/signup'
import Login from './pages/login'
import ResetPassword from './pages/resetPassword'
import MyProfile from './pages/myProfile'

import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import MuiThemeProvider from '@material-ui/styles/ThemeProvider'
import CssBaseline from '@material-ui/core/CssBaseline';
import {useDarkMode} from './utils/theme'

import {useSelector, shallowEqual} from 'react-redux'

const App = () => {
  const [theme, toggleDarkMode] = useDarkMode();
  let themeObj = createMuiTheme(theme)
  
  const {authenticated} = useSelector(state => ({
    authenticated: state.user.authenticated
  }), shallowEqual)
  
    let authNavbar = authenticated ? (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/me/posts/:postId" component={MyProfile} />
        <Route path="/me" component={MyProfile}/>
        <Redirect to="/"/>
      </Switch>
    ) : 
    <Switch>
      <Route exact path="/" component={Signup}/>
      {/* <Route path="/signup" component={Signup}/> */}
      <Route path="/login" component={Login}/>
      <Route path="/resetPassword/:token" component={ResetPassword}/>
      <Route component={NotFound}/>
    </Switch>

    return (
    <MuiThemeProvider theme={themeObj}>
      <CssBaseline />
     <Router>
      <div className={authenticated ? 'App' : 'App-auth'}>
       <Navbar mode={toggleDarkMode}/>
       {authNavbar}
      </div>
     </Router>
    </MuiThemeProvider>
    )
  }

export default App
