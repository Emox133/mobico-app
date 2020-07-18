import React, {Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import AuthBar from './AuthBar'

import {useDispatch, useSelector, shallowEqual} from 'react-redux'
import * as userActions from './../../redux/actions/userActions'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
// import IconButton from '@material-ui/core/IconButton'
// import HomeIcon from '@material-ui/icons/Home';

const Navbar = props => {
    const {authenticated} = useSelector(state => ({
        authenticated: state.user.authenticated
    }), shallowEqual)
    
    const dispatch = useDispatch()
    let appbar = authenticated ? (
        <AuthBar logout={() => dispatch(userActions.logoutUser(props.history))} mode={props.mode}/>
        ) : (
        <Fragment>
            <Button color="inherit" component={Link} to="/" style={{textTransform: 'capitalize'}}>Signup</Button>
                {/* <IconButton component={Link} to="/">
                    <HomeIcon />
                </IconButton> */}
            <Button color="inherit" component={Link} to="/login" style={{textTransform: 'capitalize'}}>Login</Button>
        </Fragment>
    )
    
        return (
            <AppBar className="appbar" position={authenticated ? 'sticky' : 'relative'} style={{height: authenticated ? '100vh' : null}} color="primary">
                <Toolbar className={authenticated ? 'nav nav__toolbar' : 'nav'} style={{justifyContent: !authenticated ? 'center' : null}}>
                    {appbar}
                </Toolbar>
            </AppBar>
        )
}

export default withRouter(Navbar)
