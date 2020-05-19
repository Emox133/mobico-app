import React from 'react'
import EditProfile from './EditProfile'
import EditProfileImage from './EditProfileImage'
import Loader from './../../utils/Loader'

// * Mui
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

// * Redux
import {useSelector, shallowEqual} from 'react-redux'

const styles = theme => ({
    ...theme.spreadThis
})

const Profile = props => {
    const {user, loading} = useSelector(state => ({
        user: state.user.user,
        loading: state.user.loading
    }), shallowEqual);
    
        const {classes} = props
        const {userImage, firstName, lastName, username,location, website, bio} = user

        let profile = user && !loading ? 
            <Paper className={classes.paper}>
                <div className={classes.imageWrapper}>
                    <img src={userImage} className={classes.profileImage} alt="profile" />
                    <EditProfileImage />
                    <EditProfile history={props.history}/>
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
         : <Loader />
       
        return profile
         
}

export default withStyles(styles)(Profile)