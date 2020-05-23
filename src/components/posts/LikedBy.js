import React, {useState} from 'react'

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import {useSelector, useDispatch, shallowEqual} from 'react-redux'

import {likedBy} from './../../redux/actions/dataActions'

const LikedBy = props => {
    const [link, setLink] = useState(null)
    const {users} = useSelector(state => ({
        users: state.data.likedBy.users
    }), shallowEqual)
    const dispatch = useDispatch()

    const handleClose = () => {
        setLink(null)
    };

    const handleSubmit = e => {
        setLink(e.currentTarget)
        dispatch(likedBy(props._id))
    };

    let placeholder = users && users.length > 0 ? users.map(user => {
        return <MenuItem style={{justifyContent: 'space-between', alignItems: 'center'}} key={user._id}>
                <Avatar alt={user.username} src={user.userImage} style={{marginRight: '1rem'}}/>
                <Typography variant="subtitle1">
                    {/* {`${user.firstName} ${user.lastName}`} */}
                    {user.username}
                </Typography>
            </MenuItem>
    }) : null

    return (
        <div>
            <Button onClick={(e) => handleSubmit(e)}>
                <span style={{fontSize: '.8rem', textTransform: 'capitalize'}} >{props.likeCount} Likes</span>
            </Button>
            <Menu
                id="likedBy-menu"
                anchorEl={link}
                keepMounted
                open={Boolean(link)}
                onClose={handleClose}
            >
               {placeholder} 
            </Menu>
        </div>
    )
}

export default LikedBy
