import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import OwnButton from '../../utils/OwnButton'
import CreatePosts from '../posts/CreatePosts'

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import Switch from '@material-ui/core/Switch';

const AuthBar = (props) => {
    return (
        <Fragment>
            <CreatePosts />
            <IconButton component={Link} to="/">
                <HomeIcon />
            </IconButton>
            <IconButton component={Link} to="/me">
                <AccountCircleIcon />
            </IconButton>
            <OwnButton tip="Logout" onClick={props.logout}>
                <ExitToAppIcon />
            </OwnButton>
            <Switch onClick={props.mode} />
        </Fragment>
    )
}

export default AuthBar
