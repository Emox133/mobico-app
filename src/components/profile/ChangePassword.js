import React, {useState, forwardRef} from 'react'
// import Emoji from './../../utils/Emoji'
import {switchError} from './../../utils/switchError'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
// import IconButton from '@material-ui/core/IconButton'

import {useDispatch, useSelector, shallowEqual} from 'react-redux'
import {changePassword} from './../../redux/actions/userActions'
import {CLEAR_ERRORS} from './../../redux/types'

const ChangePassword = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false)
    const [fields, setFields] = useState({
        currentPassword: '',
        password: '',
        confirmPassword: ''
    })

    const {errors} = useSelector(state => ({
        errors: state.UI.errors
    }), shallowEqual);

    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        dispatch({type: CLEAR_ERRORS})
    }

    const handleChange = e => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        let data = {...fields}
        dispatch(() => dispatch(changePassword(data, props.history)))
        if(!Object.values(errors)) {
            setOpen(false)
        }
    };

    return (
        <div>   
            {console.log('changed password')}
            <MenuItem onClick={handleOpen}>
                <span style={{marginRight: '.5rem'}}>Change Password</span>
                <VpnKeyIcon color="secondary"/>
            </MenuItem>
            <Dialog open={open}>
                <DialogTitle>
                    Change Your Password 
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please provide the data necessary to perform this action. 
                    </DialogContentText>
                        <TextField 
                        // autoFocus
                        id="currentPassword"
                        type="password"
                        name="currentPassword"
                        label="Current Password"
                        error={switchError(errors, 'Your') ? true : false}
                        helperText={switchError(errors, 'Your') ? errors.newPasswordMessage : null}
                        fullWidth
                        onChange={e => handleChange(e)}
                        />
                        <TextField 
                        // autoFocus
                        id="password"
                        type="password"
                        name="password"
                        label="New Password"
                        fullWidth
                        error={switchError(errors, 'User') ? true : false}
                        helperText={switchError(errors, 'User') ? errors.newPasswordMessage : null}
                        onChange={e => handleChange(e)}
                        />
                        <TextField 
                        // autoFocus
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        label="Confirm Password"
                        error={switchError(errors, 'User') ? true : false} 
                        helperText={switchError(errors, 'User') ? errors.newPasswordMessage : null}
                        fullWidth
                        onChange={e => handleChange(e)}
                        />
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="submit" onClick={(e) => handleSubmit(e)}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
})

export default React.memo(ChangePassword)
