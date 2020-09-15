import React, {useEffect, useState} from 'react'
import Emoji from './../utils/Emoji'
import Loader from './../utils/Loader'
import DeleteProfile from './../components/profile/DeleteProfile'
import Post from './../components/posts/Post'
import LikePosts from './../components/posts/LikePosts'
import DislikePosts from './../components/posts/DislikePosts'
import DeletePosts from './../components/posts/DeletePosts'
import CommentPost from './../components/posts/CommentPost'
import moment from 'moment'

import withStyles from '@material-ui/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import {useDispatch, useSelector, shallowEqual} from 'react-redux'
import {friends} from './../redux/actions/userActions'

const styles = theme => ({
    ...theme.spreadThis
})

const MyProfile = props => {
    const [postId, setPostId] = useState(null)

    const {user, visitingUser, posts, likes, loading} = useSelector(state => ({
        user: state.user.user,
        visitingUser: state.user.visitingUser,
        posts: state.data.posts,
        loading: state.user.loading,
        likes: state.user.likes
    }), shallowEqual);

    const dispatch = useDispatch();
    const {classes} = props;

    window.addEventListener('load', () => {
        if(posts.length === 0) {
            dispatch(friends())
        }
    })

    let criteria = Object.values(visitingUser).length > 0

    let rule;
    if(Object.keys(props.match.params).length > 0 && Object.keys(props.match.params)[0] === 'postId') {
        rule = true; 
    } else {
        rule = false;
    }
    useEffect(() => {
        if(rule) {
            setPostId(props.match.params.postId)
        } 
    }, [props.match.params, rule])

    let notPost = postId ? <Post postId={postId} openDialog history={props.history} rule={rule}/> : null

    // const owner = `${user.firstName} ${user.lastName}` 
    const myPosts = !criteria ? posts.filter(post => post.ownerId === user._id) 
        : posts.filter(post => post.ownerId === visitingUser._id)

    let placeholder = myPosts.map(post => {
        let likedPost = () => {
            if (likes && likes.find(l => l.belongsTo === post._id))
            return true
            else return false
        }

        let likeButton = likedPost() ? <DislikePosts post={post} /> : <LikePosts post={post}/>
        return (
            <Card className={classes.card} key={post._id} variant="outlined">
                    <CardMedia 
                        className={classes.userImage}
                        image={post.userImage}
                        title="User"/>
                    <CardContent>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '2rem'}}>
                        <Typography className={classes.owner}>
                            {post.owner}
                        </Typography>
                            <DeletePosts id={post._id} ownerId={post.ownerId}/>
                    </div>
                        <Typography style={{fontWeight: 'bold', marginBottom: 'bold'}}>
                            {moment(post.createdAt).fromNow()}
                        </Typography>

                        <Typography className={classes.text}>
                            {post.text}
                        </Typography>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        {likeButton}
                        <CommentPost id={post._id}/>
                            <span style={{fontSize: '.8rem'}}>{post.commentCount} Comments</span>
                        <Post id={post._id}/>
                    </div>
                    </CardContent>
            </Card>
        )
    })

    let profile = !loading && !criteria ? (
        <figure className="profile__user-avatar">
            <img src={user.userImage} alt="avatar" className="profile__user-img" />
                <DeleteProfile history={props.history}/>
            <figcaption className="profile__user-details">
                <h2 className="profile__user-title">{user.firstName + ' ' + user.lastName}</h2>
                <p className="profile__user-location">Location: {user.location}</p>
                <p className="profile__user-bio">{user.bio.length > 0 ? 'Biography:' : null} {user.bio}</p>
                <p className="profile__user-bio">{user.bio.length > 0 ? 'Website:' : null} {user.website}</p>
            </figcaption>
        </figure>
    ) : !loading && criteria ? (
        <figure className="profile__user-avatar">
            <img src={visitingUser.userImage} alt="avatar" className="profile__user-img" />
            <figcaption className="profile__user-details">
                <h2 className="profile__user-title">{visitingUser.firstName + ' ' + visitingUser.lastName}</h2>
                <p className="profile__user-location">Location: {visitingUser.location}</p>
                <p className="profile__user-bio">{visitingUser.bio.length > 0 ? 'Biography:' : null} {visitingUser.bio}</p>
                <p className="profile__user-bio">{visitingUser.bio.length > 0 ? 'Website:' : null} {visitingUser.website}</p>
            </figcaption>
        </figure>) : <Loader />

    return (
        <div className="profile">
            <div className="profile__user">
                {profile}
            </div>

            <Paper component="div" className="profile__posts">
                <h2 className="posts__title">
                    Posts timeline <Emoji symbol="📕" label="post notes"/>
                    {notPost}
                </h2>
                <div className="posts">
                    {placeholder}
                </div>
            </Paper>  
        </div>
    )
}

export default withStyles(styles)(MyProfile)
