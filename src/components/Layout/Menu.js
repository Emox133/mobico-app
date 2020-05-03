import React, {useState} from 'react'
import {withRouter} from 'react-router-dom'
import ChangePassword from './../profile/ChangePassword'

import SettingsIcon from '@material-ui/icons/Settings';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Settings = props => {
    const [link, setLink] = useState(null)

    const handleClose = () => {
        setLink(null);
    };

    const handleClick = e => {
        setLink(e.currentTarget);
    };

    return (
        <div>
            <Tooltip title="Settings">
                <IconButton onClick={handleClick}>
                    <SettingsIcon />
                </IconButton>
            </Tooltip>
            <Menu
                id="simple-menu"
                anchorEl={link}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                keepMounted
                open={Boolean(link)}
                onClose={handleClose}
            >
            <ChangePassword history={props.history}/>
            <MenuItem onClick={props.logout}>
                <span style={{marginRight: '.5rem'}}>Logout</span>
                <ExitToAppIcon color="secondary"/>
            </MenuItem>
            </Menu>
        </div>
    )
}

export default withRouter(Settings)
