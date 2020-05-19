import React, {useRef} from 'react'
import Posts from './../components/posts/Posts'
import Profile from './../components/profile/Profile'
import Loader from './../utils/Loader'
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import {useDispatch, useSelector, shallowEqual} from 'react-redux'
import {fetchPosts} from './../redux/actions/dataActions'
import {scrollEffect} from './../redux/actions/userActions'
import { Fab } from '@material-ui/core'

const Home = (props) => {
    const scrollRef = useRef(null);
    const dispatch = useDispatch()

    const {posts, loading} = useSelector(state => ({
        posts: state.data.posts,
        post: state.data.post,
        loading: state.data.loading,
    }), shallowEqual)

    window.addEventListener('load', () => {
        if(posts.length === 0) {
            dispatch(fetchPosts())
        }
    })

        let fetchedPosts = !loading ? (
           posts.map(post => <Posts key={post._id} post={post}/>)
        ) : <Loader /> 

        return (
            <Grid container style={{position: 'relative'}}>
               <Grid item sm={12} xs={12} md={7}>
                    {fetchedPosts}
                <Tooltip title="Scroll to bottom">
                    <Fab 
                        color="primary" 
                        size="small" 
                        style={{position: 'fixed', zIndex: '10000', bottom: '1rem', right: '.8rem'}}
                        onClick={scrollEffect(scrollRef)}
                        >
                        <ArrowDownwardIcon />
                    </Fab>
                </Tooltip>
                    <div ref={scrollRef}></div>
                </Grid> 
                <Grid item md={5}>
                    <Profile history={props.history}/>
                </Grid>
            </Grid>
        )
}

export default Home
