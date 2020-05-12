import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import CreatePosts from '../posts/CreatePosts'
import Menu from './../Layout/Menu'
import Notifications from './../profile/Notifications'

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
// import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import Switch from '@material-ui/core/Switch';

const AuthBar = (props) => {
    return (
        <Fragment>
            <Tooltip title="Home">
                <IconButton component={Link} to="/">
                    <HomeIcon />
                </IconButton>
            </Tooltip>
            <CreatePosts />
            <Tooltip title="Profile">
                <IconButton component={Link} to="/me">
                    <AccountCircleIcon />
                </IconButton>
            </Tooltip>
            <Notifications />
            <Menu logout={props.logout}/>
            <Tooltip title="Day / Night">
                <Switch onClick={props.mode} />
            </Tooltip>
        </Fragment>
    )
}

export default AuthBar
