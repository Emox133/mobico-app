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

export const createPost = (data, history) => dispatch => {
    dispatch({type: types.LOADING_FROM_DATA});
    axios.post('/posts', data, {validateStatus: () => {return true}})
    .then(res => {
        console.log(res.data)
        if(res.data.status !== 'error') {
            dispatch({
                type: types.CREATE_POST
            })
        } else {
            dispatch({
                type: types.SET_ERRORS,
                payload: res.data.error.errors
            })
            dispatch({type: types.STOP_LOADING})
        }
    })
    .catch(err => console.error(err))
    history.go(0)
};

// TODO: FINISH THIS ACTION
export const deletePost = id => dispatch => {
    dispatch({type: types.LOADING_FROM_DATA});
    axios.delete(`/posts/${id}`, {validateStatus: () => {return true}})
    .then(res => {
        console.log(res)
        dispatch({type: types.DELETE_POST})
    })
    .catch(err => {
        console.error(err)
        dispatch({
            type: types.SET_ERRORS,
            payload: err
        })
    })
    // window.location.reload()
};

export const likePost = id => dispatch => {
    dispatch({type: types.LOADING_FROM_DATA})
    axios.post(`/posts/${id}/like`, null, {validateStatus: status => {return true}})
    .then(res => {
        console.log(res)
        dispatch({type: types.LIKE_POST})
        // dispatch({type: types.START_SCROLL_EFFECT})
    })
    .catch(err => console.error(err))
};