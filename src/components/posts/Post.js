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
        post: state.data.post
    }), shallowEqual);

    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen(true);
        dispatch(getOnePost(props.id))
    };

    const handleClose = () => {
        setOpen(false);
    }

    let text = ['"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"']

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
