import React, { Component } from 'react'
import Posts from './../components/posts/Posts'
import axios from 'axios'

// * Mui
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'

class home extends Component {
    state = {
        posts: null
    }

    componentDidMount(){
        axios.get('/posts')
        .then(res => {
            this.setState({
                posts: res.data.data.posts
            })
            console.log(this.state.posts)
        })
        .catch(err => console.error(err))
    }

    render(){
        let fetchedPosts = this.state.posts ? (
            this.state.posts.map(post => <Posts key={post._id} post={post}/>)
        ) : <CircularProgress color="secondary" size={150} thickness={2} style={{display: 'block', margin: '0 auto'}}/>

        return (
            <Grid container>
                <Grid item sm={8} xs={12}>
                    {fetchedPosts}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile ...</p>
                </Grid>
            </Grid>
        )
    }
}

export default home
