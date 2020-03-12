import React, { Component } from 'react'
import AppLogo from './../images/logo-mobico.png'
import axios from 'axios'

// * Mui
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment'
import StarsIcon from '@material-ui/icons/Stars'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
    ...theme.spreadThis
})

class signup extends Component {
    state = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        bio: '',
        website: '',
        location: '',
        errors: {},
        loading: false
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({loading: true})

        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        }
        axios.post('/users/signup', newUser, {
            validateStatus: status => {
                return true
            }
        })
        .then(res => {
            if(res.data.status !== 'error') {
                console.log(res.data)
                this.props.history.push('/')
            } else {
                this.setState({errors: res.data.error.errors})
            }
        })
        .catch(err => console.log(err))
    }

    render() {
        const {classes} = this.props
        const {errors} = this.state
        return (
        <Grid container className={classes.formWrapper}>
            <Grid item sm />
                <Grid item sm>
                <img src={AppLogo} alt="mobico logo" className={classes.image}/>
                <form noValidate autoComplete="off" className={classes.form} onSubmit={this.handleSubmit}>
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
                    onChange={this.handleChange}
                    value={this.state.firstName}
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
                    onChange={this.handleChange}
                    value={this.state.lastName}
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
                    onChange={this.handleChange}
                    value={this.state.username}
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
                    onChange={this.handleChange}
                    value={this.state.email}
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
                    onChange={this.handleChange}
                    value={this.state.password}
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
                    onChange={this.handleChange}
                    value={this.state.confirmPassword}
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
                    onChange={this.handleChange}
                    value={this.state.location}
                    fullWidth
                    />
                    <TextField 
                    id="website"
                    name="website"
                    placeholder="Website"
                    type="text"
                    className={classes.textField}
                    onChange={this.handleChange}
                    value={this.state.website}
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
                    onChange={this.handleChange}
                    value={this.state.bio}
                    fullWidth
                    />
                        <Button type="submit" variant="contained" color="primary" style={{marginTop: '10px'}} className={classes.button}>
                            Signup
                            {this.state.loading && (
                                <CircularProgress color="white" size="30" className={classes.spinner}/>
                            )}
                        </Button>
                    </form>
                </Grid>
            <Grid item sm />
        </Grid>
        )
    }
}

export default withStyles(styles)(signup)
