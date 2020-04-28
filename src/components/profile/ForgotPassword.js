import React, {Fragment, useState} from 'react'
import Emoji from './../../utils/Emoji'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import LiveHelpIcon from '@material-ui/icons/LiveHelp'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send'

import {useDispatch} from 'react-redux'
import {forgotPassword} from './../../redux/actions/userActions'

const ForgotPassword = () => {
    const [open, setOpen] = useState(false)
    const [email, setEmail] = useState({email: ''});

    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = e => {
        setEmail({
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        dispatch(forgotPassword(email))
    };

    return (
        <Fragment>
                <Button color="primary" onClick={handleOpen} style={{marginTop: '.5rem'}}>
                    Forgot Password <LiveHelpIcon />
                </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmit}>
                <DialogTitle id="form-dialog-title">
                    Forgot your password ? <Emoji symbol="🔐" label="password"/>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please provide us with your e-mail so that we can help you generate new password.
                    </DialogContentText>
                    <TextField 
                        autoFocus
                        margin="dense"
                        name="email"
                        id="e-mail"
                        label="E-mail"
                        type="email"
                        fullWidth
                        onChange={e => handleChange(e)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" color="secondary">
                        Send <SendIcon />
                    </Button>
                </DialogActions>
                </form>
            </Dialog>
        </Fragment>   
    )
}

export default ForgotPassword
