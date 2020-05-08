import React, {useEffect, useRef} from 'react'
import Posts from './../components/posts/Posts'
import Profile from './../components/profile/Profile'
import Loader from './../utils/Loader'

// * Mui
import Grid from '@material-ui/core/Grid'

// * Redux
import {useDispatch, useSelector, shallowEqual} from 'react-redux'
import {fetchPosts} from './../redux/actions/dataActions'

const Home = (props) => {
    const dispatch = useDispatch()
    const scrollRef = useRef(null);

    const scrollToBottom = () => {
        scrollRef.current.scrollIntoView({behavior: "smooth"})
    };

    const {posts, loading, scrollEffect} = useSelector(state => ({
        posts: state.data.posts,
        post: state.data.post,
        loading: state.data.loading,
        scrollEffect: state.UI.scrollEffect
    }), shallowEqual)
    
    useEffect(() => {
        if(posts.length === 0) {
            dispatch(fetchPosts())
        }
    }, [dispatch, posts])
    
        let fetchedPosts = posts && !loading ? (
           posts.map(post => <Posts key={post._id} post={post}/>)
        ) : <Loader />

    useEffect(() => {
        if(scrollEffect) {
            scrollToBottom()
        }
    }, [fetchedPosts, scrollEffect]);

        return (
            <Grid container>
                <Grid item sm={8} xs={12}>
                    {fetchedPosts}
                    <div ref={scrollRef}></div>
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile history={props.history}/>
                </Grid>
            </Grid>
        )
}

export default Home
