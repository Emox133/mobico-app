import React, {Fragment} from 'react'
import OwnButton from './../../utils/OwnButton'

// MUI
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

// Redux
import {useDispatch} from 'react-redux'
import {likePost} from './../../redux/actions/dataActions'

const LikePosts = props => {
    const {post} = props;
    const dispatch = useDispatch();

    const handleLike = () => {
        dispatch(likePost(post._id))
    };  

    return (
        <Fragment>
            <OwnButton tip="Like Post" onClick={handleLike}>
                <FavoriteBorderIcon color="primary"/> 
            </OwnButton>
            <span>{post.likeCount} Likes</span>
        </Fragment>
    )
}

export default LikePosts
