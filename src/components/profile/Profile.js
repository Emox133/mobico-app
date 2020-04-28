import React, {Component} from 'react'
import EditProfile from './EditProfile'
import EditProfileImage from './EditProfileImage'
import Loader from './../../utils/Loader'

// * Mui
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

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
                    <EditProfileImage />
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
                    <EditProfile history={this.props.history}/>
                </div>
            </Paper>
        ) : <Loader />
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