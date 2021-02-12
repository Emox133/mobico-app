import React from 'react'
import {withRouter} from 'react-router-dom'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Tooltip from '@material-ui/core/Tooltip'

import {useDispatch} from 'react-redux'
import {visitProfiles, acceptFriendRequest} from '../../redux/actions/userActions'
import {makeStyles} from '@material-ui/core/styles'
import {useMediaQuery} from '@material-ui/core'

const useStyles = makeStyles({
    listText: {
        fontSize: '.7rem'
    },
    locationText: {
        fontSize: '.6rem'
    }
})

const RequestSentBy = (props) => {
    const {username, userImage, location, _id} = props.request
    const dispatch = useDispatch()
    const classes = useStyles()
    const {listText, locationText} = classes
    const isActive = useMediaQuery('(max-width: 600px)')

    const handleAcceptingRequest = id => {
        dispatch(acceptFriendRequest(id))

        alert(`${username} is your friend now.`)

        window.location.reload()
        // dispatch(friends())
        // dispatch(getMyFriendRequests())
    }

    return (
        <List dense={false}>
            <ListItem style={{marginRight: '.8rem'}}>
                <ListItemAvatar>
                <Avatar src={userImage}/>
                </ListItemAvatar>
                <ListItemText
                    onClick={() => dispatch(visitProfiles(props.history, _id))}
                    primary={`${username} sent you a friend request.`}
                    // style={{cursor: 'pointer'}}
                    classes={isActive ? {primary: listText, secondary: locationText} : null}
                    secondary={location}
                />
                <ListItemSecondaryAction>
                <Tooltip title="accept">
                    <IconButton onClick={() => handleAcceptingRequest(_id)} style={{marginBottom: '1rem'}}>
                        <CheckCircleIcon color="primary"/>
                    </IconButton>
                </Tooltip>
                </ListItemSecondaryAction>
            </ListItem>
        </List>
    )
}

export default withRouter(RequestSentBy)
