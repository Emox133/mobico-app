import React from 'react'
import {Link} from 'react-router-dom'

// *MUI
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

const Navbar = () => {
    return (
        <AppBar position="static" >
            <Toolbar className="nav">
                <Button color="inherit" component={Link} to="/signup">Signup</Button>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/login">Login</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
