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

export const getOnePost = id => dispatch => {
    // dispatch({type: types.LOADING_FROM_DATA});
    axios.get(`/posts/${id}`, {validateStatus: () => {return true}})
    .then(res => {
        console.log(res)
        if(res.data.status !== 'error' && res.data.status !== 'fail') {
            dispatch({
                type: types.SET_ONE_POST,
                payload: res.data.data
            })
        } else {
            dispatch({
                type: types.SET_ERRORS,
                payload: {message: res.data.message}
            })
        }
    })
    .catch(err => {
        console.log(err)
    })
};

export const createPost = data => dispatch => {
    dispatch({type: types.LOADING_FROM_DATA});
    axios.post('/posts', data, {validateStatus: () => {return true}})
    .then(res => {
        console.log(res.data)
        if(res.data.status !== 'error') {
            dispatch({
                type: types.CREATE_POST
            })
            dispatch(fetchPosts())
        } else {
            dispatch({
                type: types.SET_ERRORS,
                payload: res.data.error.errors
            })
            dispatch({type: types.STOP_LOADING})
        }
    })
    .catch(err => console.error(err))
    // if(restrict.length > 0) {
    //     history.go(0)
    // } else {
    //     return;
    // }
};

// TODO: FINISH THIS ACTION
export const deletePost = id => dispatch => {
    dispatch({type: types.LOADING_FROM_DATA});
    axios.delete(`/posts/${id}`, {validateStatus: () => {return true}})
    .then(res => {
        console.log(res)
        dispatch({type: types.DELETE_POST})
        dispatch(fetchPosts())
    })
    .catch(err => {
        console.error(err)
        dispatch({
            type: types.SET_ERRORS,
            payload: err
        })
    })
};

// TODO: FINISH SCROLL EFFECT
export const likePost = id => dispatch => {
    dispatch({type: types.LOADING_FROM_DATA})
    axios.post(`/posts/${id}/like`, null, {validateStatus: status => {return true}})
    .then(res => {
        console.log(res)
        dispatch({type: types.LIKE_POST})
        // dispatch({type: types.START_SCROLL_EFFECT})
    })
    .catch(err => console.error(err))
    window.location.reload();
};

export const dislikePost = id => dispatch => {
    dispatch({type: types.LOADING_FROM_DATA})
    axios.post(`/posts/${id}/dislike`, null, {validateStatus: status => {return true}})
    .then(res => {
        console.log(res)
        dispatch({type: types.DISLIKE_POST})
        // dispatch({type: types.START_SCROLL_EFFECT})
    })
    .catch(err => console.error(err))
    // window.location.reload();
};

export const commentPost = (id, data) => dispatch => {
    // dispatch({type: types.LOADING_FROM_DATA})
    axios.post(`/posts/${id}/comment`, data, {validateStatus: () => {return true}})
    .then(res => {
        if(res.data.status !== 'fail' && res.data.status !== 'error') {
            // dispatch({type: types.STOP_LOADING})
        }
        else {
            // dispatch({type: types.STOP_LOADING})
            dispatch({
                type: types.SET_ERRORS,
                payload: {commentErr: res.data.message}
            })
        }
    })
    .catch(err => console.log(err))
};