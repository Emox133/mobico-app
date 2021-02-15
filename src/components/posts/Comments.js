import React, {Fragment} from 'react'
import moment from 'moment'

import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import CancelIcon from '@material-ui/icons/Cancel'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import {useDispatch, useSelector, shallowEqual} from 'react-redux'
import {deleteComment} from './../../redux/actions/dataActions'

const Comments = React.memo(props => {
    const {user} = useSelector(state => ({
        user: state.user.user
    }), shallowEqual)
    const dispatch = useDispatch();
    
    const {comments} = props;
    const isActive = useMediaQuery('(max-width: 375px)')

    const handleDelete = () => {
        dispatch(deleteComment(comments._id, comments.post));
    }

    let myComment = user._id === comments.user ? <Tooltip title="Delete comment">
        <IconButton onClick={handleDelete} style={{position: 'absolute', top: '.3rem', right: isActive ? '-.8rem' : '0'}}>
            <CancelIcon color="secondary"/>
        </IconButton>
    </Tooltip> : null

    return (
        <List>
            <ListItem className="posts__comment">
                    {myComment}
                <ListItemAvatar>
                    <Avatar alt={comments.nameOfUser} src={comments.userImage}/>
                </ListItemAvatar>
                <ListItemText>
                    <Fragment>
                        <Typography
                            component="span"
                            variant="h6"
                            style={{fontSize: isActive ? '.88rem' : '1.125rem'}}
                        >
                            {comments.nameOfUser}
                        </Typography>
                        <Typography 
                            variant="subtitle2"
                            style={{marginBottom: '.5rem', fontSize: isActive ? '.6rem' : '.8rem'}}
                        >
                            {moment(comments.createdAt).format("MMMM Do YYYY, h:mm a")}
                        </Typography>
                        <Typography style={{fontSize: isActive ? '.8rem' : '1rem'}}>
                            {" - " + comments.text}
                        </Typography>
                    </Fragment>
                </ListItemText>
            </ListItem>
            <Divider variant="inset" component="hr"/>
        </List>
    )
})

export default Comments
