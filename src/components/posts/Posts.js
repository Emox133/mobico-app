import React from 'react'
import Post from './Post'
import moment from 'moment'
import DeletePosts from './DeletePosts'
import LikePosts from './LikePosts'
import LikedBy from './LikedBy'
import CommentPost from './CommentPost'
import DislikePosts from './DislikePosts'
import VisitProfiles from '../profile/VisitProfile'

// * Mui
import withStyles from '@material-ui/styles/withStyles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery'

import {useSelector, shallowEqual} from 'react-redux'

const styles = theme => ({
    ...theme.spreadThis
})

const Posts = props => {
    const isActive = useMediaQuery('(max-width: 960px)');

    const {likes} = useSelector(state => ({
        likes: state.user.likes
    }), shallowEqual)
    
    const {post, classes} = props

    let likedPost = () => {
        if (likes && likes.find(l => l.belongsTo === post._id))
        return true
        else return false
    }

    let likeButton = likedPost() ? <DislikePosts post={post} /> : <LikePosts post={post}/>

    return (
            <Card className={isActive ? classes.cardSmall : classes.card}>
                    <CardMedia 
                        className={classes.userImage}
                        image={post.userImage}
                        title="User"/>
                    <CardContent>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '2rem'}}>
                        <Typography className={classes.owner}>
                            {post.user}
                        </Typography>
                            <VisitProfiles ownerId={post.userId} id={post.userId} history={props.history} />
                            <DeletePosts id={post._id} ownerId={post.userId}/>
                    </div>
                        <Typography style={{fontWeight: 'bold', marginBottom: '.5rem'}}>
                            {moment(post.createdAt).fromNow()}
                        </Typography>

                        <Typography className={classes.text}>
                            {post.text}
                        </Typography>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        {likeButton} <LikedBy likeCount={post.likeCount} _id={post._id}/>
                        <CommentPost id={post._id}/>
                            <span style={{fontSize: '.8rem'}}>{post.commentCount} Comments</span>
                        <Post id={post._id}/>
                    </div>
                    </CardContent>
            </Card>
    )
}

export default withStyles(styles)(Posts)
