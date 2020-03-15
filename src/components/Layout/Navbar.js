import React from 'react'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import * as userActions from './../../redux/actions/userActions'

// *MUI
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import OwnButton from './../../utils/OwnButton'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {withRouter} from 'react-router-dom'

const Navbar = (props) => {
    const dispatch = useDispatch()
    
        return (
            <AppBar position="static" >
                <Toolbar className="nav">
                    <Button color="inherit" component={Link} to="/signup">Signup</Button>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <OwnButton tip="Logout" onClick={() => dispatch(userActions.logoutUser(props.history))}>
                        <ExitToAppIcon />
                    </OwnButton>
                </Toolbar>
            </AppBar>
        )
}

export default withRouter(Navbar)
