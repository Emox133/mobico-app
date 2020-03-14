import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import * as userActions from './../../redux/actions/userActions'

// *MUI
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import OwnButton from './../../utils/OwnButton'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

class Navbar extends Component {

    handleLogout = () => {
        this.props.onLogoutUser();
    };

    render() {
        return (
            <AppBar position="static" >
                <Toolbar className="nav">
                    <Button color="inherit" component={Link} to="/signup">Signup</Button>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <OwnButton tip="Logout" onClick={this.handleLogout}>
                        <ExitToAppIcon />
                    </OwnButton>
                </Toolbar>
            </AppBar>
        )
    }
}

const mapActionsToProps = dispatch => {
    return {
        onLogoutUser: () => dispatch(userActions.logoutUser())
    }
}

export default connect(null, mapActionsToProps)(Navbar) 
