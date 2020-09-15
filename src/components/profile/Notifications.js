import React, {useState} from 'react'
import moment from 'moment'
import {withRouter, Link} from 'react-router-dom'
// import Post from './../posts/Post'

import Badge from '@material-ui/core/Badge'
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatIcon from '@material-ui/icons/Chat';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography'
import {useMediaQuery} from '@material-ui/core'

import { useSelector, shallowEqual } from 'react-redux';
// import {notificationsSeen} from './../../redux/actions/userActions'

const Notifications = props => {
    const [link, setLink] = useState(null)
    const isActive = useMediaQuery('(max-width: 768px)')

    const {notifications} = useSelector(state => ({
        notifications: state.user.notifications
    }), shallowEqual)

    // const dispatch = useDispatch();

    const handleClick = e => {
        setLink(e.currentTarget)
    };

    const handleClose = () => {
        setLink(null)
    };
    
    // const onNotificationsVisited = () => {
    //     // notifications.filter(n => n.read);
    //     dispatch(notificationsSeen());
    // };

    let icon;
    if(notifications && notifications.length > 0) {
        notifications.filter(n => n.read === false).length > 0
        ? icon = (
            <Badge badgeContent={notifications.filter(n => n.read === false).length} color="secondary">
                <NotificationsIcon />
                {/* onClick={onNotificationsVisited} */}
            </Badge>
        ) : icon = <NotificationsIcon />
    } else {
        icon = <NotificationsIcon />
    }

    let placeholder = 
    notifications && notifications.length > 0 ? (
        notifications.map(n => {
            const nType = n.type === 'like' ? 'liked' : n.type === 'friend-request' ? 'accepted' : 'commented';
            const nVariant = n.type === 'friend-request' ? 'friend request' : 'post'
            const time = moment(n.createdAt).fromNow();
            const iconColor = n.read ? 'primary' : 'secondary';
            const icon = n.type === 'like' ? <FavoriteIcon color={iconColor} style={{ marginRight: 10 }}/> 
            : n.type === 'friend-request' ? <PersonIcon color={iconColor} style={{marginRight: 10}}/> 
            : <ChatIcon color={iconColor} style={{marginRight: 10}}/>
            
            return (
                <MenuItem
                    key={n.createdAt}
                    onClick={handleClose}
                    component={Link}
                    to={n.type !== 'friend-request' ? `/me/posts/${n.postId}` : '/search'}
                    >
                    {icon}
                    <Typography style={{fontSize: '.7rem'}}> 
                        {n.sender} {nType} your {nVariant} {time}
                    </Typography>
                </MenuItem>
            )
        })
    ) : (
        <MenuItem onClick={handleClose}>
            You have no notifications yet.
        </MenuItem>
    )
    
    return (
        <div>
        <Tooltip title="Notifications">
            <IconButton onClick={e => handleClick(e)}>
                {icon}
            </IconButton>
        </Tooltip>
        <Menu
            id="simple-menu"
            style={{height: isActive ? '75%' : '100%'}}
            anchorEl={link}
            keepMounted
            // anchorOrigin={{ vertical: "right", horizontal: "right" }}
            // transformOrigin={{ vertical: "top", horizontal: "center" }}
            open={Boolean(link)}
            onClose={handleClose}
            // onClick={onNotificationsRead}
        >
            {placeholder}
        </Menu>
        </div>
    )
}

export default withRouter(Notifications)
