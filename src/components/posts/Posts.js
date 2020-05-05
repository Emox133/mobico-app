import React from 'react'
import Post from './Post'
// import OwnButton from './../../utils/OwnButton'
import moment from 'moment'
import DeletePost from './DeletePosts'
import LikePosts from './LikePosts'
import CommentPost from './CommentPost'
// import DislikePosts from './DislikePosts'

// * Mui
import withStyles from '@material-ui/styles/withStyles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    ...theme.spreadThis
})

const Posts = props => {
    const {post, classes} = props

    return (
            <Card className={classes.card}>
                    <CardMedia 
                        className={classes.userImage}
                        image={post.userImage}
                        title="User"/>
                    <CardContent>
                        <Typography className={classes.owner}>
                            {post.owner}
                            <DeletePost id={post._id} owner={post.owner}/>
                        </Typography>

                        <Typography >
                            {moment(post.createdAt).fromNow()}
                        </Typography>

                        <Typography className={classes.text}>
                            {post.text}
                        </Typography>
                    <div style={{display: 'flex'}}>
                        <LikePosts post={post}/>
                        <CommentPost id={post._id}/>
                            <span>{post.commentCount} Comments</span>
                        <Post id={post._id} classes={classes}/>
                    </div>
                    </CardContent>
            </Card>
    )
}

export default withStyles(styles)(Posts)
