import React, {useEffect} from 'react'
import Posts from './../components/posts/Posts'
import Profile from './../components/profile/Profile'

// * Mui
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'

// * Redux
import {useDispatch, useSelector, shallowEqual} from 'react-redux'
import {fetchPosts} from './../redux/actions/dataActions'

const Home = () => {
    const dispatch = useDispatch()

    const {posts, loading} = useSelector(state => ({
        posts: state.data.posts,
        loading: state.data.loading
    }), shallowEqual)
    
    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])
    
        let fetchedPosts = posts && !loading ? (
            posts.map(post => <Posts key={post._id} post={post}/>)
        ) : <CircularProgress color="secondary" size={150} thickness={2} style={{display: 'block', margin: '0 auto'}}/>

        return (
            <Grid container>
                <Grid item sm={8} xs={12}>
                    {fetchedPosts}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        )
}

export default Home
