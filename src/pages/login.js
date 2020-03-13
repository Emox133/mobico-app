import React, { Component } from 'react'
import AppLogo from './../images/logo-mobico.png'
import axios from 'axios'

// * Mui
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
    ...theme.spreadThis
})

class login extends Component {
    state = {
        email: '',
        password: '',
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

        const user = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/users/login', user, {
            validateStatus: status => {
                return true
            }
        })
        .then(res => {
            if(res.data.status !== 'error') {
                console.log(res.data)
                localStorage.setItem('token', res.data.token)
                this.props.history.push('/')
                window.location.reload()
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
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    error={errors.email ? true : false}
                    helperText={errors.email ? errors.email.message : null}
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
                    className={classes.textField}
                    onChange={this.handleChange}
                    value={this.state.password}
                    fullWidth
                    />
                        <Button type="submit" variant="contained" color="primary" style={{marginTop: '10px'}} className={classes.button}>
                            Login
                            {this.state.loading && (
                                <CircularProgress color="secondary" size="30" className={classes.spinner}/>
                            )}
                        </Button>
                    </form>
                </Grid>
            <Grid item sm />
        </Grid>
        )
    }
}

export default withStyles(styles)(login)
