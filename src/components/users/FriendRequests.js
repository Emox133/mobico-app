import React, {forwardRef} from 'react'
import RequestSentBy from './RequestSentBy'

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PersonIcon from '@material-ui/icons/Person';
import Tooltip from '@material-ui/core/Tooltip'
import Badge from '@material-ui/core/Badge'

import {makeStyles} from '@material-ui/core/styles'

import {useSelector, shallowEqual} from 'react-redux'

const useStyles = makeStyles({
    requestMenuItem: {
        display: 'flex',
        flexDirection: 'column'
    },
    requestPaper: {
        position: 'fixed',
        left: '50px !important',
        top: '72px !important',
        maxHeight: '300px',
        width: '27rem',
        overflowY: 'scroll'
    }
})

const FriendRequests = forwardRef ((props, ref) => {
    const classes = useStyles()
    const {requestMenuItem, requestPaper} = classes
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    
    const {friendRequests, whoSentFriendRequests} = useSelector(state => ({
        friendRequests: state.user.friendRequests,
        whoSentFriendRequests: state.user.whoSentFriendRequests
    }), shallowEqual)

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    }
  
    const handleClose = () => {
        setAnchorEl(null);
    }

    const whoSentRequest = whoSentFriendRequests.map(request => {
        return (
            <MenuItem key={request._id} classes={{root: requestMenuItem}} onClick={handleClose}> 
                <RequestSentBy request={request}/>
            </MenuItem>
        )   
    })

    return (
    <div>
        <Tooltip title="Friend Requests">
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <Badge color="secondary" badgeContent={friendRequests.length}>
                    <PersonIcon />
                </Badge>
            </IconButton>
        </Tooltip>
        <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            classes={{paper: requestPaper}}
        >
            {whoSentFriendRequests.length === 0 ? <div style={{textAlign: 'center'}}><strong>You have no friend requests yet.</strong></div> : whoSentRequest}
        </Menu>
    </div>
    )
}) 


export default FriendRequests
