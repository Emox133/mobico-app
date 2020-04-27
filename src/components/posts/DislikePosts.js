import React, {Fragment} from 'react'
import OwnButton from '../../utils/OwnButton'

// MUI
import FavoriteIcon from '@material-ui/icons/Favorite';

// Redux
import {useDispatch} from 'react-redux'
import {dislikePost} from '../../redux/actions/dataActions'

const LikePosts = props => {
    const {post} = props;
    const dispatch = useDispatch();

    const handleDislike = () => {
        dispatch(dislikePost(post._id))
    }

    return (
        <Fragment>
            <OwnButton tip="Dislike Post" onClick={handleDislike}>
               <FavoriteIcon color="primary"/>
            </OwnButton>
            <span>{post.likeCount} Likes</span>
        </Fragment>
    )
}

export default LikePosts
