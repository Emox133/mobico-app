import React, {useState, Fragment} from 'react';
import {withRouter} from 'react-router-dom'
import OwnButton from '../../utils/OwnButton'
import {switchError} from './../../utils/switchError'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CreateIcon from '@material-ui/icons/Create';

import {useDispatch, useSelector, shallowEqual} from 'react-redux'
import {CLEAR_ERRORS} from './../../redux/types'
import {createPost} from '../../redux/actions/dataActions'

const FormDialog = (props) => {
  const [open, setOpen] = useState(false);
  const [inputState, setInputState] = useState({text: ''})

  const {errors} = useSelector(state => ({
    errors: state.UI.errors
  }), shallowEqual)

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch({type: CLEAR_ERRORS})
  };

  const handleChange = e => {
    setInputState({
        [e.target.name]: e.target.value
    })
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(createPost({text: inputState.text}, props.history, inputState.text))
    if(inputState.text.length > 0) setOpen(false);
  };

  return (
    <Fragment>
      <OwnButton tip="Create Post" onClick={handleClickOpen}>
        <CreateIcon />
      </OwnButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
      <form onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">Create a post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            error={switchError(errors, 'Post') ? true : false}
            helperText={switchError(errors, 'Post') ? errors.createPostMsg : null}
            margin="dense"
            id="text"
            name="text"
            type="text"
            label="Post"
            multiline={true}
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit">
            Post
          </Button>
        </DialogActions>
      </form>
      </Dialog>
    </Fragment>
  );
}

export default withRouter(FormDialog)
