import React, {Fragment} from 'react'

// Mui
import IconButton from '@material-ui/core/IconButton'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';import Tooltip from '@material-ui/core/Tooltip'

// Redux
import {useDispatch} from 'react-redux'
import {updateProfile} from './../../redux/actions/userActions'

const EditProfileImage = () => {
    const dispatch = useDispatch();

    const handleImage = e => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('photo', image, image.name);
        dispatch(updateProfile(formData));
    };

    const handleImageChange = () => {
        const file = document.getElementById('image__input');
        file.click();
    };

    return (
    <Fragment>
        <form encType="multipart/form-data" >
            <input 
            type="file" 
            name="photo"
            id="image__input"
            hidden="hidden"
            onChange={handleImage}
            />
        </form>
    <Tooltip title="Change profile image">
        <IconButton onClick={handleImageChange}>
            <PhotoCameraIcon />
        </IconButton>
    </Tooltip>
    </Fragment>
    )
}

export default EditProfileImage
