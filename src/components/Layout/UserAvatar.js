import React from 'react';
import Avatar from '@material-ui/core/Avatar';

export default function ImageAvatars(props) {
  return <Avatar alt={props.owner} src={props.image} />
}
