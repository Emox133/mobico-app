import React, { useState } from 'react'
import AppLogo from './../images/logo-mobico-5.png'

// * Mui
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment'
import StarsIcon from '@material-ui/icons/Stars'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
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
        bio: '',
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
                    error={errors.firstName ? true : false}
                    helperText={errors.firstName ? errors.firstName.message : null}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <Tooltip title="Required" placement="top">
                                <StarsIcon />
                            </Tooltip>
                        </InputAdornment>
                        )
                    }}
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
                    error={errors.lastName ? true : false}
                    helperText={errors.lastName ? errors.lastName.message : null}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <Tooltip title="Required" placement="top">
                                <StarsIcon />
                            </Tooltip>
                        </InputAdornment>
                        )
                      }}
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
                    error={errors.username ? true : false}
                    helperText={errors.username ? errors.username.message : null}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <Tooltip title="Required" placement="top">
                                <StarsIcon />
                            </Tooltip>
                        </InputAdornment>
                        )
                      }}
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
                    error={errors.email ? true : false}
                    helperText={errors.email ? errors.email.message : null}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <Tooltip title="Required" placement="top">
                                <StarsIcon />
                            </Tooltip>
                        </InputAdornment>
                        )
                      }}
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
                    error={errors.password ? true : false}
                    helperText={errors.password ? errors.password.message : null}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <Tooltip title="Required" placement="top">
                                <StarsIcon />
                            </Tooltip>
                        </InputAdornment>
                        )
                      }}
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
                    error={errors.confirmPassword ? true : false}
                    helperText={errors.confirmPassword ? errors.confirmPassword.message : null}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <Tooltip title="Required" placement="top">
                                <StarsIcon />
                            </Tooltip>
                        </InputAdornment>
                        )
                      }}
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
                    error={errors.location ? true : false}
                    helperText={errors.location ? errors.location.message : null}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <Tooltip title="Required" placement="top">
                                <StarsIcon />
                            </Tooltip>
                        </InputAdornment>
                        )
                      }}
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
                     <TextField 
                    id="bio"
                    name="bio"
                    placeholder="Biography"
                    type="text"
                    multiline
                    rows="3"
                    className={classes.textField}
                    onChange={handleChange}
                    value={fields.bio}
                    fullWidth
                    />
                        <Button type="submit" variant="contained" color="primary" style={{marginTop: '10px'}}>
                            Signup
                        </Button>
                    </form>
                    <Typography style={{marginTop: '.7rem', fontSize: isActive ? '1rem' : '1.3rem'}}>
                        &copy; Developed and designed by <span style={{fontWeight: 'bold', letterSpacing: '.05em'}}>Emir Salihović</span>
                    </Typography>
                </Grid>
            <Grid item xs />
        </Grid>
        )
}

export default withStyles(styles)(Signup)
