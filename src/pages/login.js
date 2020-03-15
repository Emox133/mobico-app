import React, { Component } from 'react'
import AppLogo from './../images/logo-mobico.png'

// * Redux
import {connect} from 'react-redux'
import * as userActions from './../redux/actions/userActions'

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
        loading: false
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        }   
    
        this.props.onLoginUser(user, this.props.history);
    }

    render() {
        const {classes, errors} = this.props
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
                    error={errors.message ? true : false}
                    helperText={errors.message ? errors.message : null}
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
                    error={errors.message ? true : false}
                    helperText={errors.message ? errors.message : null}
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

const mapStateToProps = state => {
    return {
        errors: state.UI.errors
    }
}

const mapActionToProps = dispatch => {
    return {
        onLoginUser: (userInfo, history) => dispatch(userActions.loginUser(userInfo, history))
    }
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(login));
