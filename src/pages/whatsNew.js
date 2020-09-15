import React, {useEffect, useState, useRef} from 'react';
// import AppLogo from './../images/logo-mobico-5.png'

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Zoom from '@material-ui/core/Zoom';
import NewReleasesIcon from '@material-ui/icons/NewReleases';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

export default function FullScreenDialog() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const myRef = useRef(null)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    myRef.current.style.display = 'none'
  };

  useEffect(() => {
    setTimeout(() => {
        handleClickOpen()
    })
  }, [])

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom in={open} timeout={{exit: 2000}} style={{transitionDelay: open ? '500ms' : '0'}} ref={ref} {...props} />;
  });

  return (
    <>
      <Dialog ref={myRef} fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit">
              <NewReleasesIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              What's new? 
            </Typography>
            <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Friends system !!!"/>
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Visit other users profiles feature."/>
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Now only posts of your friends appear on your post timeline."/>
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Fixed bugs and perfomance improvements."/>
          </ListItem>
        </List>
      </Dialog>
    </>
  );
}
