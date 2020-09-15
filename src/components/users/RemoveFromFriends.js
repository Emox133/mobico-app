import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

import {useDispatch} from 'react-redux'
import {undoFriendRequest} from '../../redux/actions/userActions'
 
const RemoveFromFriends = (props) => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
    const dispatch = useDispatch()

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleFriendDeletion = (id) => {
        dispatch(undoFriendRequest(id))

        alert(props.sendedRequest ? `You have successfully canceled your friend request to ${props.username}.` 
        : `You have successfully removed ${props.username} from friends.`)

        window.location.reload()
    }
  
    return (
      <div>
          <Tooltip title="Remove from friends?">
            <IconButton edge="end" color="primary" onClick={handleClickOpen}>
                <PersonAddDisabledIcon color="secondary"/> 
            </IconButton>
          </Tooltip>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Remove from friends?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
            {props.sendedRequest ? `Are you sure you want to cancel your friend request to ${props.username}` 
            : `Are you sure you want to remove ${props.username} from your friends?`} 
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="secondary">
              Disagree
            </Button>
            <Button onClick={(id) => handleFriendDeletion(props.id)} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

export default RemoveFromFriends
