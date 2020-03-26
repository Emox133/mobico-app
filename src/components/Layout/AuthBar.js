import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import OwnButton from '../../utils/OwnButton'
import CreatePosts from '../posts/CreatePosts'

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const AuthBar = (props) => {
    return (
        <Fragment>
            <CreatePosts />
            <IconButton component={Link} to="/">
                <HomeIcon />
            </IconButton>
            <IconButton>
                <AccountCircleIcon />
            </IconButton>
            <OwnButton tip="Logout" onClick={props.logout}>
                <ExitToAppIcon />
            </OwnButton>
        </Fragment>
    )
}

export default AuthBar
