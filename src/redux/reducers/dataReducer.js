import * as types from './../types'

const initialState = {
    posts: [],
    singlePost: {
        post: [],
        comments: []
    },
    likedBy: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case types.SET_POSTS:
            return {
                ...state,
                loading: false,
                posts: action.payload
            }

        case types.SET_ONE_POST:
            return {
                ...state,
                loading: false,
                singlePost: action.payload
            }
        
        case types.CREATE_POST:
            return {
                ...state,
                loading: false
            }
        
        case types.DELETE_POST:
            let deleteCopiedPosts = [...state.posts]
            let intactPosts = deleteCopiedPosts.filter(el => el._id !== action.id)
            return {
                ...state,
                posts: intactPosts,
                loading: false
            }

        case types.LIKE_POST: 
            let likeCopiedPosts = [...state.posts]
            let likePostIndex = likeCopiedPosts.findIndex(el => el._id === action.id)
            likeCopiedPosts[likePostIndex].likeCount += 1
            return {
                ...state,
                posts: likeCopiedPosts,
                // loading: false
            }

        case types.LIKED_BY: 
            return {
                ...state,
                likedBy: action.payload
            }

        case types.DISLIKE_POST:
            let dislikeCopiedPosts = [...state.posts]
            let dislikePostIndex = dislikeCopiedPosts.findIndex(el => el._id === action.id)
            dislikeCopiedPosts[dislikePostIndex].likeCount -= 1
            return {
                ...state,
                posts: dislikeCopiedPosts
                // loading: false
            }
        
        case types.LOADING_FROM_DATA:
            return {
                ...state,
                loading: true
            }

        case types.STOP_LOADING: 
            return {
                ...state,
                loading: false
            }

        case types.COMMENT_POST: 
            let commentCopiedPosts = [...state.posts]
            let commentPostIndex = commentCopiedPosts.findIndex(el => el._id === action.id)
            commentCopiedPosts[commentPostIndex].commentCount += 1;

            return {
                ...state,
                posts: commentCopiedPosts
            }

        case types.REMOVE_COMMENT: 
            let singlePost = {...state.singlePost}
            let copiedPosts = [...state.posts]
            let filteredComments = singlePost.comments.filter(c => c._id !== action.commentId)
            let index = copiedPosts.findIndex(el => el._id === action.id)
            copiedPosts[index].commentCount -= 1;

            return {
                ...state,
                posts: copiedPosts,
                singlePost: {
                    post: singlePost.post,
                    comments: filteredComments
                }
            }

        default:
            return state
    }
}