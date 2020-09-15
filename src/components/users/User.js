import React from 'react'
import RemoveFromFriends from './RemoveFromFriends'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Avatar from '@material-ui/core/Avatar'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import ListItemText from '@material-ui/core/ListItemText'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
// import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import {sendFriendRequest} from '../../redux/actions/userActions'
import {useSelector, useDispatch, shallowEqual} from 'react-redux'

const User = props => {
    const {userImage, location, username, _id} = props.user
    
    const {user, friendRequestsSentByMe, whoSentFriendRequests, friendRequestsIreceivedAndAccepted} = useSelector(state => ({
        user: state.user.user,
        friendRequestsSentByMe: state.user.friendRequestsSentByMe,
        whoSentFriendRequests: state.user.whoSentFriendRequests,
        friendRequestsIreceivedAndAccepted: state.user.friendRequestsIreceivedAndAccepted
    }), shallowEqual)

    const dispatch = useDispatch()

    let criteria = false
    whoSentFriendRequests.map(r => {
       if(r._id === _id) criteria = true
        return criteria
    }) 

    // let friendsAlready = false
    // myFriends.map(friend => {
    //     if(friend._id === _id) friendsAlready = true
    //     return friendsAlready
    // })

    // console.log(friendsAlready)

    let friendsAlready = false
    friendRequestsIreceivedAndAccepted.map(f => {
        if(f.requestSender === _id && f.accepted === true) friendsAlready = true
        return friendsAlready
    })

    console.log(friendsAlready)

    let sendedRequest = false
    friendRequestsSentByMe.map(r => {
        if(r.requestReceiver === _id && r.accepted === false) sendedRequest = true
        return sendedRequest
    })

    let isSentFriendRequest = () => {
        if(friendRequestsSentByMe && friendRequestsSentByMe.find(r => r.requestReceiver === _id))  
        return true
            else return false
        }

    let sendRequestBlue = 
    <Tooltip title="Send Friend Request">
        <IconButton edge="end" onClick={(id) => dispatch(sendFriendRequest(_id))}>
            <PersonAddIcon color="primary"/> 
        </IconButton>
    </Tooltip> 

    // let sendRequestRed = 
    // <Tooltip title="Remove from friends ?">
    //     <IconButton edge="end" onClick={(id) => dispatch(undoFriendRequest(_id))}>
    //         <PersonAddDisabledIcon color="secondary"/> 
    //     </IconButton>
    // </Tooltip> 
    
    // let sendRequestButton = !isSentFriendRequest() ? sendRequestBlue : sendRequestRed

    // let personSentRequestToMe = 
    // <Tooltip title="accept">
    //         <IconButton onClick={(id) => handleAcceptingRequest(_id)} edge="end">
    //             <CheckCircleIcon color="primary"/>
    //         </IconButton>
    // </Tooltip>

    // console.log(sendedRequest)    

    return (
        <>
            <List dense={true}>
                <ListItem>
                <ListItemAvatar>
                    <Avatar src={userImage}/>
                </ListItemAvatar>
                <ListItemText
                    primary={username}
                    secondary={location}
                />
                <ListItemSecondaryAction>
                    {!sendedRequest && isSentFriendRequest() ? <RemoveFromFriends username={username} id={_id} sendedRequest={sendedRequest}/> : sendedRequest ? <RemoveFromFriends username={username} id={_id} sendedRequest={sendedRequest}/> : criteria ? <p>Received</p> : friendsAlready ? <RemoveFromFriends username={username} id={_id} sendedRequest={sendedRequest}/> : user._id !== _id ? sendRequestBlue : null}
                </ListItemSecondaryAction>
                </ListItem>
            </List>
        </>
    )
}

export default User
