import React, {useState} from 'react'
import moment from 'moment'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {useDispatch, useSelector, shallowEqual} from 'react-redux'
import {getOnePost} from './../../redux/actions/dataActions'
import { Typography } from '@material-ui/core';

const Post = (props) => {
    const [open, setOpen] = useState(false);
    const {post} = useSelector(state => ({
        post: state.data.singlePost.post
    }), shallowEqual);

    console.log(post)

    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen(true);
        dispatch(getOnePost(props.id))
    };

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div>
            <IconButton onClick={handleOpen}>
                <ExpandMoreIcon />
            </IconButton>
                <Dialog open={open} maxWidth="md" onClose={handleClose}> 
                <div className="posts__individual">
                    <img src={post.userImage} alt={post.owner} className={props.classes.postImage}/>
                    <DialogTitle>
                        <Typography>
                            {post.owner}
                        </Typography>
                        <Typography>
                            {moment(post.createdAt).fromNow()}
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <Typography>
                            {post.text}
                        </Typography>
                    </DialogContent>
                </div>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
        </div>
    )
}

export default Post
