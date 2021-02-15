import * as types from './../types'
import axios from 'axios'
import {friends} from './userActions'

// export const friends = () => dispatch => {
//     dispatch({type: types.LOADING_FROM_DATA});
//     axios.get('/posts', {validateStatus: () => {return true}})
//     .then(res => {
//         dispatch({
//             type: types.SET_POSTS,
//             payload: res.data.data.posts
//         })
//     })
//     .catch(err => console.log(err))
// };

export const getOnePost = id => dispatch => {
    axios.get(`/posts/${id}`, {validateStatus: () => {return true}})
    .then(res => {
        // console.log(res)
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
        // console.log(res)
        if(res.data.status !== 'error') {
            dispatch({
                type: types.CREATE_POST
            })
            dispatch(friends())
        } else {
            dispatch({
                type: types.SET_ERRORS,
                payload: {createPostMsg: res.data.message}
            })
            dispatch({type: types.STOP_LOADING})
        }
    })
    .catch(err => console.error(err))
};

export const deletePost = id => dispatch => {
    dispatch({type: types.LOADING_FROM_DATA});
    axios.delete(`/posts/${id}`, {validateStatus: () => {return true}})
    .then(res => {
        // console.log(res)
        dispatch({type: types.DELETE_POST, id: id})
        dispatch({type: types.START_SCROLL_EFFECT, switch: 'off'})
    })
    .catch(err => {
        console.error(err)
        dispatch({
            type: types.SET_ERRORS,
            payload: err
        })
    })
};

export const likePost = id => dispatch => {
    axios.post(`/posts/${id}/like`, null, {validateStatus: () => {return true}})
    .then(res => {
        // console.log(res)
        dispatch({type: types.LIKE_POST, id: id, payload: res.data.data.like})
    })
    .catch(err => console.error(err))
};

export const likedBy = id => dispatch => {
    axios.get(`/posts/${id}/like`, {validateStatus: () => {return true}})
    .then(res => {
        console.log(res)
        if(res.data.status !== 'error' && res.data.status !== 'fail') {
            dispatch({
                type: types.LIKED_BY,
                payload: res.data.data
            })
        } else {
            dispatch({
                type: types.SET_ERRORS,
                payload: {message: res.data.message}
            })
        }
    })
    .catch(err => console.log(err))
};

export const dislikePost = id => dispatch => {
    axios.post(`/posts/${id}/dislike`, null, {validateStatus: () => {return true}})
    .then(res => {
        // console.log(res)
        dispatch({type: types.DISLIKE_POST, id: id})
    })
    .catch(err =>  {
        // console.error(err)
    })
};

export const commentPost = (id, data) => dispatch => {
    // dispatch({type: types.LOADING_FROM_DATA})
    axios.post(`/posts/${id}/comment`, data, {validateStatus: () => {return true}})
    .then(res => {
        if(res.data.status !== 'fail' && res.data.status !== 'error') {
            dispatch({type: types.COMMENT_POST, id: id})
            alert('Comment posted.')
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

export const deleteComment = (commentId, id) => dispatch => {
    // dispatch({type: types.LOADING_FROM_DATA})
    axios.delete(`/posts/${id}/comment/${commentId}`)
    .then(res => {
        dispatch({type: types.REMOVE_COMMENT, commentId: commentId, id: id})
    }).catch(err => console.log(err.response))
};