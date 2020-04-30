import React, {useEffect} from 'react'
import Emoji from './../utils/Emoji'
import Loader from './../utils/Loader'

import {useDispatch, useSelector, shallowEqual} from 'react-redux'
import {fetchPosts} from './../redux/actions/dataActions'

const MyProfile = () => {
    const {user, posts, loading} = useSelector(state => ({
        user: state.user.user,
        posts: state.data.posts,
        loading: state.data.loading
    }), shallowEqual);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const owner = `${user.firstName} ${user.lastName}`;
    const myPosts = posts.filter(post => post.owner === owner);

    let placeholder = myPosts.map(post => {
        return (
            <div key={post._id}>
                <img src={post.userImage} alt="owner" style={{width: '200px', height: '200px'}}/>
                <h2>{post.owner}</h2>
                <p>{post.text}</p>
                <span>{post.likeCount}</span>
                <span>{post.commentCount}</span>
            </div> 
        )
    })

    return (
        <div className="profile">
            <div className="profile__user">
                <figure className="profile__user-avatar">
                    <img src={!loading ? user.userImage : <Loader />} alt="avatar" className="profile__user-img" />
                    <figcaption className="profile__user-details">
                        <h2 className="profile__user-title">{user.firstName + ' ' + user.lastName}</h2>
                        <p className="profile__user-location">Location: {user.location}</p>
                        <p className="profile__user-bio">{user.bio}</p>
                    </figcaption>
                </figure>
            </div>

            <div className="profile__posts">
                <h2 className="posts__title">
                    Posts timeline <Emoji symbol="📕" label="post notes"/>
                </h2>
                <div className="posts">
                    {placeholder}
                </div>
            </div>  
        </div>
    )
}

export default MyProfile
