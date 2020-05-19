import React, {Fragment, useState} from 'react'
import Emoji from './../../utils/Emoji'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Tooltip from '@material-ui/core/Tooltip'

import {useDispatch} from 'react-redux'
import {deleteProfile} from './../../redux/actions/userActions'

const DeleteProfile = props => {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
    <Fragment>
        <Tooltip title="Delete profile" placement="left">
            <DeleteForeverIcon onClick={handleOpen} className="profile__user-delete" fontSize="large" />
        </Tooltip>
       <Dialog open={open}>
           <DialogTitle>
               Delete Profile ? 
               <Emoji symbol="😪" label="sad face"/>
           </DialogTitle>
           <DialogContent>
               <DialogContentText>
                    Are you sure you want to delete your profile ?
                    Once you agree there is no going back.
               </DialogContentText>
           </DialogContent>
           <DialogActions>
               <Button type="submit" color="secondary" onClick={() => dispatch(deleteProfile(props.history))}>
                   Delete
               </Button>
               <Button onClick={handleClose}>
                   Cancel
               </Button>
           </DialogActions>
       </Dialog>
    </Fragment>
    )
}

export default DeleteProfile
