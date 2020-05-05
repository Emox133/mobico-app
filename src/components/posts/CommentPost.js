import React, {useState} from 'react'
import {switchError} from './../../utils/switchError'

// import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'

import {useDispatch, useSelector, shallowEqual} from 'react-redux'
import {commentPost} from './../../redux/actions/dataActions'
import {CLEAR_ERRORS} from './../../redux/types'

const CommentPost = props => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState({text: ''})
    const {errors} = useSelector(state => ({
        errors: state.UI.errors
    }), shallowEqual)

    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        dispatch({type: CLEAR_ERRORS})
    };

    const handleChange = e => {
        setText({
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = e => {
        e.preventDefault();
        let data = {...text}
        dispatch(commentPost(props.id, data));
        if(!Object.values(errors)) {
            setOpen(false)
        }
    };

    return (
        <div>
            <Tooltip title="Comment post">
                <IconButton onClick={handleOpen}>
                    <ChatBubbleIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} fullWidth={true}>
                <DialogTitle>
                    Comment post 
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {/* Comment this post. */}
                    </DialogContentText>
                    <TextField 
                        id="text"
                        name="text"
                        label="Comment"
                        type="text"
                        error={switchError(errors, 'Comment') ? true : false}
                        helperText={switchError(errors, 'Comment') ? errors.commentErr : null}
                        fullWidth
                        onChange={e => handleChange(e)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>

                    <Button type="submit" onClick={e => handleSubmit(e)}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CommentPost
