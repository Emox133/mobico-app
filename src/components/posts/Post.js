import React, {useState, useEffect} from 'react'
import Comments from './Comments'
import moment from 'moment'

import withStyles from '@material-ui/styles/withStyles'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {useDispatch, useSelector, shallowEqual} from 'react-redux'
import {getOnePost} from './../../redux/actions/dataActions'

const styles = theme => ({
    ...theme.spreadThis
})

const Post = (props) => {
    const [open, setOpen] = useState(false);
    const {post, comments} = useSelector(state => ({
        post: state.data.singlePost.post,
        comments: state.data.singlePost.comments,
    }), shallowEqual);

    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen(true);
        dispatch(getOnePost(props.id))
    };

    const handleClose = () => {
        setOpen(false);
    }

    const {openDialog, postId} = props
    useEffect(() => {
        if(openDialog) {
            setOpen(true)
            dispatch(getOnePost(postId))
        }
    }, [openDialog, postId, dispatch]);

    return (
        <div style={{display: props.postId ? 'none' : null}}>
            <IconButton onClick={handleOpen}>
                <ExpandMoreIcon />
            </IconButton>
                <Dialog open={open} maxWidth="md" onClose={handleClose}> 
                <div className="posts__individual">
                    <img src={post.userImage} alt={post.owner} className={props.classes.postImage}/>
                        <Typography variant="h3">
                            {post.owner}
                        </Typography>
                        <Typography>
                            {moment(post.createdAt).fromNow()}
                        </Typography>
                    <DialogContent style={{width: '50%'}}>
                        <Typography>
                            {post.text}
                        </Typography>
                        <Typography variant="h4" style={{marginTop: '1rem', height: '1.9rem'}}>
                            Comments
                        </Typography>
                        {comments.map(c => {
                            return <Comments key={c._id} comments={c} id={post._id}/>
                        })}
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

export default withStyles(styles)(Post)
