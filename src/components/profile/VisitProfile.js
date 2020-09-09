import React from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

import {useDispatch, useSelector, shallowEqual} from 'react-redux'
import {visitProfiles} from '../../redux/actions/userActions'

const VisitProfile = ({id, history, ownerId}) => {
    const {user} = useSelector(state => ({
        user: state.user.user
    }), shallowEqual)

    const dispatch = useDispatch()

    let criteria = ownerId !== user._id ? 
        <Tooltip title="Visit Profile">
            <IconButton onClick={() => dispatch(visitProfiles(history, id))}>
                <AccountCircleIcon color="primary"/>
            </IconButton>
        </Tooltip> : null

    return criteria 
}

export default VisitProfile
