import React, {useEffect} from 'react'
import Emoji from './../utils/Emoji'
import Loader from './../utils/Loader'
import DeleteProfile from './../components/profile/DeleteProfile'

import withStyles from '@material-ui/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete';

import {useDispatch, useSelector, shallowEqual} from 'react-redux'
import {fetchPosts, deletePost} from './../redux/actions/dataActions'

const styles = theme => ({
    ...theme.spreadThis
})

const MyProfile = props => {
    const {user, posts, loading} = useSelector(state => ({
        user: state.user.user,
        posts: state.data.posts,
        loading: state.user.loading
    }), shallowEqual);

    const dispatch = useDispatch();
    const {classes} = props;

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const owner = `${user.firstName} ${user.lastName}`;
    const myPosts = posts.filter(post => post.owner === owner);

    let placeholder = myPosts.map(post => {
        return (
            <Card key={post._id} className={classes.card}>
                <CardActionArea>
                    <CardMedia 
                        image={post.userImage}
                        title="owner"
                        style={{width: '220px', height: '200px'}}
                    />
                    <CardContent>
                        <Typography variant="h5" gutterBottom={true} className="posts__delete">
                            {post.owner} 
                            <Tooltip title="Delete post">
                                <DeleteIcon onClick={() => dispatch(deletePost(post._id))}/>
                            </Tooltip>
                        </Typography>
                        <Typography variant="body2">
                            {post.text}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        {post.likeCount}
                    </Button>
                    <Button size="small" color="primary">
                        {post.commentCount}
                    </Button>
                </CardActions>
            </Card> 
        )
    })

    let profile = !loading ? (
        <figure className="profile__user-avatar">
            <img src={user.userImage} alt="avatar" className="profile__user-img" />
                <DeleteProfile history={props.history}/>
            <figcaption className="profile__user-details">
                <h2 className="profile__user-title">{user.firstName + ' ' + user.lastName}</h2>
                <p className="profile__user-location">Location: {user.location}</p>
                <p className="profile__user-bio">{user.bio}</p>
                <p className="profile__user-bio">{user.website}</p>
            </figcaption>
        </figure>
    ) : <Loader />

    return (
        <div className="profile">
            <div className="profile__user">
                {profile}
            </div>

            <Paper component="div" className="profile__posts">
                <h2 className="posts__title">
                    Posts timeline <Emoji symbol="📕" label="post notes"/>
                </h2>
                <div className="posts">
                    {placeholder}
                </div>
            </Paper>  
        </div>
    )
}

export default withStyles(styles)(MyProfile)
