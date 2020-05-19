import React, { useState } from 'react'
import AppLogo from './../images/logo-mobico-5.png'
import ForgotPassword from './../components/profile/ForgotPassword'

// * Redux
import {useSelector, useDispatch, shallowEqual} from 'react-redux'
import {loginUser} from './../redux/actions/userActions'

// * Mui
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import {useMediaQuery} from '@material-ui/core'
// import SnackBar from './../utils/SnackBar'

const styles = theme => ({
    ...theme.spreadThis
})

const Login = props => {
    const [fields, setFields] = useState({
        email: '',
        password: ''
    })

    const {errors} = useSelector(state => ({
        errors: state.UI.errors
    }), shallowEqual)
    
    const {classes} = props
    const dispatch = useDispatch()
    const isActive = useMediaQuery('(max-width: 650px)')

   const handleChange = e => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }
    
   const handleSubmit = e => {
        e.preventDefault();
        const {email, password} = fields

        const user = {
            email: email,
            password: password
        }   
        
        dispatch(loginUser(user, props.history));
    }
    
        return (
        <Grid container className={classes.formWrapper}>
            <Grid item xs />
                <Grid item xs>
                <img src={AppLogo} alt="mobico logo" className={isActive ? classes.logoSmall : classes.logo}/>
                <form noValidate autoComplete="on" className={classes.form} onSubmit={handleSubmit}>
                    <TextField 
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    error={errors.message ? true : false}
                    helperText={errors.message ? errors.message : null}
                    className={classes.textField}
                    onChange={handleChange}
                    value={fields.email}
                    fullWidth
                    />
                    <TextField 
                    id="password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    error={errors.message ? true : false}
                    helperText={errors.message ? errors.message : null}
                    className={classes.textField}
                    onChange={handleChange}
                    value={fields.password}
                    fullWidth
                    />
                        <Button type="submit" variant="contained" color="primary" style={{marginTop: '10px'}} className={classes.button}>
                            Login
                        </Button>
                    </form>
                        <ForgotPassword history={props.history}/>
                        {/* <SnackBar /> */}
                </Grid>
            <Grid item xs />
        </Grid>
        )
}

export default withStyles(styles)(Login);
