import React, {Component} from 'react'

// * Mui
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

// * Redux
import {connect} from 'react-redux'

const styles = theme => ({
    ...theme.spreadThis
})

class Profile extends Component {
    render(){
        const {classes, user: {firstName, lastName, username, userImage, location, website, bio}, loading} = this.props

        let profile = this.props.user && !loading ? (
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

const mapStateToProps = state => {
    return {
        user: state.user.user,
        loading: state.user.loading
    }
};

export default connect(mapStateToProps, null)(withStyles(styles)(Profile))