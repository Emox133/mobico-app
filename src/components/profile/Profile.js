import React, {Component} from 'react'
import axios from 'axios'

// * Mui
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
    ...theme.spreadThis
})

class Profile extends Component {
    state = {
        user: {},
        likes: [],
        notifications: [],
        loading: false
    }

    componentDidMount(){
        axios.get('/users/me', {
            validateStatus: () => {
                return true
            }
        })
        .then(res => {
            this.setState({
                loading: true,
                user: res.data.data.user,
                likes: res.data.data.likes,
                notifications: res.data.data.notifications
            })
        })
        .catch(err => console.log(err))
    }

    render(){
        const {classes} = this.props
        const {firstName, lastName, username, userImage, location, website, bio}  = this.state.user

        let profile = this.state.loading ? (
            <Paper className={classes.paper}>
                <div className={classes.imageWrapper}>
                    <img src={userImage} className={classes.profileImage} alt="profile" />
                    <Typography variant="h4">
                        {firstName} {lastName}
                    </Typography>
                    <Typography variant="h4">
                        @{username}
                    </Typography>
                    <Typography>
                        {location}
                    </Typography>
                    {website ? (
                        <Typography>
                            {website}
                        </Typography>
                    ) : null}
                    {bio ? (
                        <Typography>
                            {bio}
                        </Typography>
                    ) : null}
                </div>
            </Paper>
        ) : <CircularProgress size={100} thickness={2} style={{display: 'block', margin: '0 auto'}}/>
        return(
            <div>
                {profile}
            </div>
        )
    }
}

export default withStyles(styles)(Profile)