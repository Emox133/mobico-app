import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import CreatePosts from '../posts/CreatePosts'
import Menu from './../Layout/Menu'
import Notifications from './../profile/Notifications'
import EditProfile from './../profile/EditProfile'
import EditProfileImage from './../profile/EditProfileImage'
import UserAvatar from './UserAvatar'
import FriendRequests from './../users/FriendRequests'

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import ChatIcon from '@material-ui/icons/Chat';
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Switch from '@material-ui/core/Switch';
import {useMediaQuery} from '@material-ui/core'

import {useDispatch, useSelector, shallowEqual} from 'react-redux'
import {clearVisitingUser} from '../../redux/actions/userActions'

const themeType = localStorage.getItem('theme-type')

const AuthBar = (props) => {
    const {username, userImage, user} = useSelector(state => ({
        user: state.user.user,
        username: state.user.user.username,
        userImage: state.user.user.userImage
    }), shallowEqual)

    const dispatch = useDispatch()

    const isActive = useMediaQuery('(max-width: 960px)')
    let userSmall =  
    <Tooltip title={`${username}`}>
        <IconButton component={Link} to={'/me'}>
            <UserAvatar owner={username} image={userImage}/>
        </IconButton>
    </Tooltip>

    return (
        <Fragment>
            {isActive && user ? userSmall : null}
            <Tooltip title="Home">
                <IconButton component={Link} to="/" 
                        onClick={() => dispatch(clearVisitingUser())}>
                    <HomeIcon />
                </IconButton>
            </Tooltip>
            <FriendRequests />
            <CreatePosts />
            {!isActive ?
            <Tooltip title="Profile">
                <IconButton component={Link} to="/me">
                    <AccountCircleIcon />
                </IconButton>
            </Tooltip> : null
            }
            <Notifications />
            {isActive ? <EditProfileImage /> : null}
            {isActive ? <EditProfile /> : null}
            <Tooltip title="Day / Night">
                <Switch onClick={props.mode} checked={themeType == 'dark' ? true : false}/>
            </Tooltip>
            
            <Tooltip title="Search Users">
                <IconButton component={Link} to="/search">
                    <SearchIcon />
                </IconButton>
            </Tooltip>

            <Tooltip title="Chat on mobico!">
                <IconButton component={Link} to="/chat">
                    <ChatIcon />
                </IconButton>
            </Tooltip>
            <Menu logout={props.logout}/>
        </Fragment>
    )
}

export default AuthBar
