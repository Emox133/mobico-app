import React, {Fragment} from 'react'

// Mui
import IconButton from '@material-ui/core/IconButton'
import CreateIcon from '@material-ui/icons/Create'
import Tooltip from '@material-ui/core/Tooltip'

// Redux
import {useDispatch} from 'react-redux'

const handleImage = e => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);

};

const handleImageChange = () => {
    const file = document.getElementById('image__input');
    file.click();
};

const EditProfileImage = () => {
    return (
    <Fragment>
        <input 
        type="file" 
        id="image__input"
        hidden="hidden"
        onChange={handleImage}
        />
    <Tooltip title="Change profile image">
        <IconButton onClick={handleImageChange}>
            <CreateIcon color="primary"/>
        </IconButton>
    </Tooltip>
    </Fragment>
    )
}

export default EditProfileImage
