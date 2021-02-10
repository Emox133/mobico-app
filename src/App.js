import React, {useState, useEffect, useCallback} from 'react'
import './App.css'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Navbar from './components/Layout/Navbar'
import NotFound from './pages/notFound'
// import Alert from './utils/Alert'
import {showAlerts} from './utils/Alerts'

// import LandingPage from './pages/landingPage'
import SearchUsers from './pages/SearchUsers'
import Home from './pages/home'
import Signup from './pages/signup'
import Login from './pages/login'
import ResetPassword from './pages/resetPassword'
import MyProfile from './pages/myProfile'
import Chat from './pages/Chat'
import axios from 'axios'

import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import MuiThemeProvider from '@material-ui/styles/ThemeProvider'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography'
import {useDarkMode} from './utils/theme'

import {useSelector, shallowEqual} from 'react-redux'

axios.defaults.baseURL = 'https://mobicoapp.herokuapp.com/api/v1'

const App = () => {
  const [theme, toggleDarkMode] = useDarkMode();
  const [offline, setOffline] = useState(undefined);
  let themeObj = createMuiTheme(theme)

  useEffect(() => {
    window.addEventListener('offline', () => {
      setOffline(true);
    });

    window.addEventListener('online', () => {
      setOffline(false);
    });
  }, []);

  const onlineStatusHandler = useCallback(() => {
    if(offline === true) {
      showAlerts('warning--offline', 'Please check your connection');
    } else if (offline === false) {
      showAlerts('success', 'You are back online.');
    }
  }, [offline]);

  useEffect(() => {
    onlineStatusHandler();
  }, [onlineStatusHandler]);
  
  const {authenticated} = useSelector(state => ({
    authenticated: state.user.authenticated
  }), shallowEqual)
  
    let authNavbar = authenticated ? (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/me/posts/:postId" component={MyProfile} />
        <Route path="/me" component={MyProfile}/>
        <Route path="/search" component={SearchUsers}/>
        <Route path="/chat" component={Chat}/>
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
     <Router basename="/">
      <div className={authenticated ? 'App' : 'App-auth'}>
       <Navbar mode={toggleDarkMode}/>
       {/* {offline === true ? showAlerts('warning--offline', 'Please check your connection.') : offline === false ? 
       showAlerts('success', 'You are back online.') : null} */}
       {authNavbar}
       {!authenticated ? <Typography style={{marginTop: ".2rem", minHeight: '2rem'}}>
            &copy; Developed and designed by <span style={{fontWeight: 'bold', letterSpacing: '.05em'}}>Emir Salihović</span>
        </Typography> : null}
      </div>
     </Router>
    </MuiThemeProvider>
    )
  }

export default App
