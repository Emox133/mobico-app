import React, {useState, Fragment} from 'react';
import {withRouter} from 'react-router-dom'
import OwnButton from '../../utils/OwnButton'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';

import {useDispatch, useSelector, shallowEqual} from 'react-redux'
import {deletePost} from '../../redux/actions/dataActions'

const FormDialog = (props) => {
  const [open, setOpen] = useState(false);

  const {user} = useSelector(state => ({
    user: state.user.user
  }), shallowEqual)

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deletePost(props.id))
  };

  let deleteButton = props.ownerId === user._id ? 
  <OwnButton tip="Delete Post" onClick={handleClickOpen}>
    <DeleteIcon color="secondary" /> 
  </OwnButton> : null

  return (
    <Fragment>
      {deleteButton}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
      <form>
        <DialogTitle id="form-dialog-title">Are you sure you want to delete this post?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button type="button" color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </form>
      </Dialog>
    </Fragment>
  );
}

export default withRouter(FormDialog)
