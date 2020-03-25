import React, {Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import AuthBar from './AuthBar'

// * Redux
import {useDispatch, useSelector, shallowEqual} from 'react-redux'
import * as userActions from './../../redux/actions/userActions'

// *MUI
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home';

const Navbar = (props) => {
    const dispatch = useDispatch()
    
    const {authenticated} = useSelector(state => ({
        authenticated: state.user.authenticated
    }), shallowEqual)

    let appbar = authenticated ? (
        <AuthBar logout={() => dispatch(userActions.logoutUser(props.history))}/>
        ) : (
        <Fragment>
            <Button color="inherit" component={Link} to="/signup">Signup</Button>
                <IconButton component={Link} to="/">
                    <HomeIcon />
                </IconButton>
            <Button color="inherit" component={Link} to="/login">Login</Button>
        </Fragment>
    )
    
        return (
            <AppBar position="sticky" >
                <Toolbar className="nav">
                    {appbar}
                </Toolbar>
            </AppBar>
        )
}

export default withRouter(Navbar)
