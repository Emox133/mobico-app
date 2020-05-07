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

import {useDispatch, useSelector, shallowEqual} from 'react-redux'
import {deleteComment} from './../../redux/actions/dataActions'

const Comments = React.memo(props => {
    const {user} = useSelector(state => ({
        user: state.user.user
    }), shallowEqual)
    
    const {comments} = props;
    const dispatch = useDispatch();
    
    const handleDelete = () => {
        dispatch(deleteComment(comments._id, comments.belongsTo));
    }

    let myComment = user._id === comments.owner ? <Tooltip title="Delete comment">
        <IconButton onClick={handleDelete} style={{position: 'absolute', top: '.3rem', right: '0'}}>
            <CancelIcon />
        </IconButton>
    </Tooltip> : null

    return (
        <List>
            {console.log('Comments component')}
            <ListItem className="posts__comment">
                    {myComment}
                <ListItemAvatar>
                    <Avatar alt={comments.ownerName} src={comments.ownerImage}/>
                </ListItemAvatar>
                <ListItemText>
                    <Fragment>
                        <Typography
                            component="span"
                            variant="h6"
                        >
                            {comments.ownerName}
                        </Typography>
                        <Typography 
                            variant="subtitle2"
                        >
                            {moment(comments.createdAt).format("dddd, MMMM Do YYYY, h:mm a")}
                        </Typography>
                        {" - " + comments.text}
                    </Fragment>
                </ListItemText>
            </ListItem>
            <Divider variant="inset" component="hr"/>
        </List>
    )
})

export default Comments
