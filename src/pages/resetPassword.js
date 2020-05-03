import React, {Fragment, useState} from 'react'
import Emoji from './../utils/Emoji'
import Loader from './../utils/Loader'
import {switchError} from './../utils/switchError'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import {useDispatch, useSelector, shallowEqual} from 'react-redux'
import {resetPassword} from './../redux/actions/userActions'
import {CLEAR_ERRORS} from './../redux/types'

const ResetPassword = (props) => {
    const [fields, setFields] = useState({
        password: '',
        confirmPassword: ''
    })

    const {errors, loading} = useSelector(state => ({
        errors: state.UI.errors,
        loading: state.user.loading
    }), shallowEqual);

    const dispatch = useDispatch();
    const token = props.location.pathname.split('/')[2];

    const handleChange = e => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    };

    if(switchError(errors, 'Token')) {
        alert(errors.resetMessage)
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        dispatch({type: CLEAR_ERRORS})
        const data = {
            password: fields.password,
            confirmPassword: fields.confirmPassword
        }
        dispatch(resetPassword(token, data, props.history))
    }

    let placeholder = !loading ? 
        <Fragment>
            <Typography variant="h3" gutterBottom align="center" style={{marginTop: '2rem'}}>
                Reset Your Password <Emoji symbol="🔓" label="emoji"/>
            </Typography>
            <form onSubmit={handleSubmit} style={{width: '35%', margin: '0 auto', textAlign: 'center'}}>
                <TextField 
                autoFocus
                id="password"
                type="password"
                name="password"
                label="New Password"
                error={switchError(errors, 'User') ? true : false}
                helperText={switchError(errors, 'User') ? errors.resetMessage : null}
                fullWidth
                style={{marginBottom: '.5rem'}}
                onChange={e => handleChange(e)}
                />
                <TextField 
                autoFocus
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                error={switchError(errors, 'User') ? true : false}
                helperText={switchError(errors, 'User') ? errors.resetMessage : null}
                fullWidth
                onChange={e => handleChange(e)}
                />
                <Button type="submit" color="primary" variant="contained" style={{marginTop: '.5rem'}}>
                    Submit
                </Button>
            </form>    
    </Fragment>
     : <Loader />

    return placeholder
}

export default ResetPassword
