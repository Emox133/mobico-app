import React, {Fragment, useState} from 'react'
import Emoji from './../../utils/Emoji'

// MUI
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

// Redux
import {useDispatch, useSelector, shallowEqual} from 'react-redux'
import {CLEAR_ERRORS} from './../../redux/types'
import {updateProfile} from './../../redux/actions/userActions'

const EditProfile = (props) => {
    const [open, setOpen] = useState(false);
    const [inputFields, setInputFields] = useState({
        firstName: '',
        lastName: '',
        email: '',
        bio: '',
        location: '',
        username: '',
        website: ''
    })

    const {errors} = useSelector(state => ({
        errors: state.UI.errors
    }), shallowEqual);

    const {
        firstName,
        lastName,
        email,
        location,
        username,
    } = errors ? errors : {}

    const dispatch = useDispatch();

    const openHandler = () => {
        setOpen(true);
    };

    const closeHandler = () => {
        setOpen(false);
        dispatch({type: CLEAR_ERRORS})
    };

    const fieldsHandler = e => {
        setInputFields({
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = e => {
        e.preventDefault();
        const data = {...inputFields}
        dispatch(updateProfile(data, props.history));
        if(!Object.values(errors)) setOpen(false);
    };

    return (
    <Fragment>
            <Tooltip title="Edit profile" onClick={openHandler}>
                <IconButton>
                    <AssignmentIndIcon />
                </IconButton>
            </Tooltip>

            <Dialog open={open} onClose={closeHandler} >
                <form onSubmit={handleSubmit}>
                <DialogTitle>
                   Edit your profile details <Emoji symbol="✍" label="edit"/>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                         <span role="img" aria-label="note">Note ✔</span> Feel free to change fields individualy but be aware that the field validation is still on.
                    </DialogContentText>
                    <TextField 
                        autoFocus
                        id="firstName"
                        name="firstName"
                        type="text"
                        error={firstName ? true : false}
                        helperText={firstName ? firstName.message : null}
                        label="First name"
                        onChange={e => fieldsHandler(e)}
                        fullWidth
                    />
                    <TextField 
                        autoFocus
                        id="lastName"
                        name="lastName"
                        type="text"
                        error={lastName ? true : false}
                        helperText={lastName ? lastName.message : null}
                        label="Last name"
                        onChange={e => fieldsHandler(e)}
                        fullWidth
                    />
                    <TextField 
                        autoFocus
                        id="email"
                        name="email"
                        type="email"
                        error={email ? true : false}
                        helperText={email ? email.message : null}
                        label="E-mail"
                        onChange={e => fieldsHandler(e)}
                        fullWidth
                    />
                    <TextField 
                        autoFocus
                        id="bio"
                        name="bio"
                        type="text"
                        label="Biography"
                        onChange={e => fieldsHandler(e)}
                        fullWidth
                    />
                    <TextField 
                        autoFocus
                        id="location"
                        name="location"
                        type="text"
                        error={location ? true : false}
                        helperText={location ? location.message : null}
                        label="Location"
                        onChange={e => fieldsHandler(e)}
                        fullWidth
                    />
                    <TextField 
                        autoFocus
                        id="username"
                        name="username"
                        type="text"
                        error={username ? true : false}
                        helperText={username ? username.message : null}
                        label="Username"
                        onChange={e => fieldsHandler(e)}
                        fullWidth
                    />
                    <TextField 
                        autoFocus
                        id="website"
                        name="website"
                        type="text"
                        label="Website"
                        onChange={e => fieldsHandler(e)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                 <Button onClick={closeHandler} color="secondary">
                    Cancel
                </Button>
                <Button type="submit" color="primary">
                    Confirm
                </Button>
                </DialogActions>
                </form>
            </Dialog>
            </Fragment>
    )
}

export default EditProfile
