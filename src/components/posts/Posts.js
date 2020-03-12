import React from 'react'
import OwnButton from './../../utils/OwnButton'
import moment from 'moment'

// * Mui
import withStyles from '@material-ui/styles/withStyles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

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
                        </Typography>

                        <Typography color="primary">
                            {moment(post.createdAt).fromNow()}
                        </Typography>

                        <Typography className={classes.text}>
                            {post.text}
                        </Typography>

                        <OwnButton tip="Likes">
                            <FavoriteIcon color="primary"/> 
                        </OwnButton>
                            <span>{post.likeCount} Likes</span>

                        <OwnButton tip="Comments">
                            <ChatBubbleIcon color="primary"/> 
                        </OwnButton>
                            <span>{post.commentCount} Comments</span>
                    </CardContent>
            </Card>
    )
}

export default withStyles(styles)(Posts)
