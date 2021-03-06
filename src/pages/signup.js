import React, { useState } from 'react'
import AppLogo from './../images/logo-large.png'
// import WhatsNew from './whatsNew'

// * Mui
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment'
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip'
// import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {useMediaQuery} from '@material-ui/core'

// * Redux
import {useDispatch, useSelector, shallowEqual} from 'react-redux'
import {signupUser} from './../redux/actions/userActions'

const styles = theme => ({
    ...theme.spreadThis
})

const Signup = props => {
    const [fields, setFields] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        website: '',
        location: ''
    })

    const isActive = useMediaQuery('(max-width: 650px)')
   
    const {errors} = useSelector(state => ({
        errors: state.UI.errors
    }), shallowEqual)
    
    const dispatch = useDispatch()
    const {classes} = props

    const handleChange = e => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        const newUser = {
            firstName: fields.firstName,
            lastName: fields.lastName,
            username: fields.username,
            email: fields.email,
            password: fields.password,
            confirmPassword: fields.confirmPassword,
            bio: fields.bio,
            website: fields.website,
            location: fields.location
        }

        dispatch(signupUser(newUser, props.history));
    }

        return (
        <Grid container className={classes.formWrapper}>
            <Grid item xs/>
                <Grid item xs>
                <img src={AppLogo} alt="mobico logo" className={isActive ? classes.logoSmall : classes.logo}/>
                <form noValidate autoComplete="off" className={classes.form} onSubmit={handleSubmit}>
                    <TextField 
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    error={errors && errors.firstName ? true : false}
                    helperText={errors && errors.firstName ? errors.firstName.message : null}
                    InputProps={errors && errors.firstName ? {
                        startAdornment: (
                            <InputAdornment position="start">
                            <Tooltip title="Required" placement="top">
                                <InfoIcon />
                            </Tooltip>
                        </InputAdornment>
                        )
                    } : null}
                    className={classes.textField}
                    onChange={handleChange}
                    value={fields.firstName}
                    fullWidth
                    />
                    <TextField 
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    type="text"
                    error={errors && errors.lastName ? true : false}
                    helperText={errors && errors.lastName ? errors.lastName.message : null}
                    InputProps={errors && errors.lastName ? {
                        startAdornment: (
                            <InputAdornment position="start">
                            <Tooltip title="Required" placement="top">
                                <InfoIcon />
                            </Tooltip>
                        </InputAdornment>
                        )
                    } : null}
                    className={classes.textField}
                    onChange={handleChange}
                    value={fields.lastName}
                    fullWidth
                    />
                    <TextField 
                    id="username"
                    name="username"
                    placeholder="Username"
                    type="text"
                    error={errors && errors.username ? true : false}
                    helperText={errors && errors.username ? errors.username.message : null}
                    InputProps={errors && errors.username ? {
                        startAdornment: (
                            <InputAdornment position="start">
                            <Tooltip title="Required" placement="top">
                                <InfoIcon />
                            </Tooltip>
                        </InputAdornment>
                        )
                    } : null}
                    className={classes.textField}
                    onChange={handleChange}
                    value={fields.username}
                    fullWidth
                    />
                    <TextField 
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    error={errors && errors.email ? true : false}
                    helperText={errors && errors.email ? errors.email.message : null}
                    InputProps={errors && errors.email ? {
                        startAdornment: (
                            <InputAdornment position="start">
                            <Tooltip title="Required" placement="top">
                                <InfoIcon />
                            </Tooltip>
                        </InputAdornment>
                        )
                    } : null}
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
                    error={errors && errors.password ? true : false}
                    helperText={errors && errors.password ? errors.password.message : null}
                    InputProps={errors && errors.password ? {
                        startAdornment: (
                            <InputAdornment position="start">
                            <Tooltip title="Required" placement="top">
                                <InfoIcon />
                            </Tooltip>
                        </InputAdornment>
                        )
                    } : null}
                    className={classes.textField}
                    onChange={handleChange}
                    value={fields.password}
                    fullWidth
                    />
                    <TextField 
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    type="password"
                    error={errors && errors.confirmPassword ? true : false}
                    helperText={errors && errors.confirmPassword ? errors.confirmPassword.message : null}
                    InputProps={errors && errors.confirmPassword ? {
                        startAdornment: (
                            <InputAdornment position="start">
                            <Tooltip title="Required" placement="top">
                                <InfoIcon />
                            </Tooltip>
                        </InputAdornment>
                        )
                    } : null}
                    className={classes.textField}
                    onChange={handleChange}
                    value={fields.confirmPassword}
                    fullWidth
                    />
                    <TextField 
                    id="location"
                    name="location"
                    placeholder="Location"
                    type="text"
                    error={errors && errors.location ? true : false}
                    helperText={errors && errors.location ? errors.location.message : null}
                    InputProps={errors && errors.location ? {
                        startAdornment: (
                            <InputAdornment position="start">
                            <Tooltip title="Required" placement="top">
                                <InfoIcon />
                            </Tooltip>
                        </InputAdornment>
                        )
                    } : null}
                    className={classes.textField}
                    onChange={handleChange}
                    value={fields.location}
                    fullWidth
                    />
                    <TextField 
                    id="website"
                    name="website"
                    placeholder="Website"
                    type="text"
                    className={classes.textField}
                    onChange={handleChange}
                    value={fields.website}
                    fullWidth
                    />
                        <Button type="submit" variant="contained" color="primary" style={{marginTop: '10px'}}>
                            Signup
                        </Button>
                    </form>
                    {/* <Typography style={{marginTop: '.7rem', fontSize: isActive ? '1rem' : '1.3rem'}}>
                        &copy; Developed and designed by <span style={{fontWeight: 'bold', letterSpacing: '.05em'}}>Emir Salihović</span>
                    </Typography> */}
                    {/* <WhatsNew /> */}
                </Grid>
            <Grid item xs />
        </Grid>
        )
}

export default withStyles(styles)(Signup)
