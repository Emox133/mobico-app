import * as types from './../types'
import axios from 'axios'

export const fetchPosts = () => dispatch => {
    dispatch({type: types.LOADING_FROM_DATA});
    axios.get('/posts', {validateStatus: () => {return true}})
    .then(res => {
        dispatch({
            type: types.SET_POSTS,
            payload: res.data.data.posts
        })
    })
    .catch(err => console.log(err))
};