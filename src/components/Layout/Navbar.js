import React, {Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'

// * Redux
import {useDispatch, useSelector, shallowEqual} from 'react-redux'
import * as userActions from './../../redux/actions/userActions'

// *MUI
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import OwnButton from './../../utils/OwnButton'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home';
import CreateIcon from '@material-ui/icons/Create';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Navbar = (props) => {
    const dispatch = useDispatch()
    
    const {authenticated} = useSelector(state => ({
        authenticated: state.user.authenticated
    }), shallowEqual)

    let appbar = authenticated ? (
        <Fragment>
            <OwnButton tip="Create Post">
                <CreateIcon />
            </OwnButton>
            <IconButton component={Link} to="/">
                <HomeIcon />
            </IconButton>
            <IconButton>
                <AccountCircleIcon />
            </IconButton>
            <OwnButton tip="Logout" onClick={() => dispatch(userActions.logoutUser(props.history))}>
                <ExitToAppIcon />
            </OwnButton>
        </Fragment>
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
            <AppBar position="static" >
                <Toolbar className="nav">
                    {appbar}
                </Toolbar>
            </AppBar>
        )
}

export default withRouter(Navbar)
