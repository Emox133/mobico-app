import React, {useState, useEffect} from 'react'
import Comments from './Comments'
import moment from 'moment'

import withStyles from '@material-ui/styles/withStyles'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useMediaQuery from '@material-ui/core/useMediaQuery'

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

    let {rule, postId} = props
    const isActive = useMediaQuery('(max-width: 600px)')

    const handleOpen = () => {
        setOpen(true);
        dispatch(getOnePost(props.id))
    };

    const handleClose = () => {
        setOpen(false);
        postId = null;
        return rule ? props.history.push('/me') : null 
    }

    useEffect(() => {
        if(rule) {
            setOpen(true)
            dispatch(getOnePost(postId))
        }
    }, [rule, postId, dispatch]);
    
    // console.log(props.postId ? true : false, props.postId)

    return (
        <div style={{display: props.postId ? 'none' : null}}>
            <IconButton onClick={handleOpen}>
                <ExpandMoreIcon />
            </IconButton>
                <Dialog open={open} maxWidth="md" onClose={handleClose}> 
                    <DialogActions>
                        <span onClick={handleClose} style={{fontSize: '2rem', marginRight: '.5rem', cursor: 'pointer'}}>
                            &times;
                        </span>
                    </DialogActions>
                <div className="posts__individual" style={{height: isActive ? '90vh' : null}}>
                    <img src={post.userImage} alt={post.owner} className={isActive ? props.classes.postImageSmall : props.classes.postImage}/>
                        <Typography variant={isActive ? "h4" : "h3"}>
                            {post.owner}
                        </Typography>
                        <Typography>
                            {moment(post.createdAt).fromNow()}
                        </Typography>
                    <DialogContent style={{width: isActive ? '100%' : '80%'}}>
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
                </Dialog> 
        </div> 
    )
}

export default withStyles(styles)(Post)
