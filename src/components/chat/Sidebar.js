import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Contacts from './Contacts'
import Conversations from './Conversations'

import NewConversationModal from './NewConversationModal'
import NewContactModal from './NewContactModal'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={0}>
         <List>{children}</List>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    // maxWidth: '335px',
    height: '100vh',
    borderRight: '1px solid #ccc',
    position: 'relative'
  },
  sidebarButtonRoot: {
    position: 'absolute',
    bottom: 0,
    padding: '1rem',
    borderRadius: 0
    // left: '25%'
  },

  sidebarButtonLabel: {
    fontSize: '1rem',
    textTransform: 'capitalize'
  },

  sidebarIdText: {
    position: 'absolute',
    bottom: '3.7rem',
    border: '1px solid #ccc',
    padding: '.5rem'
  }

}));

export default function Sidebar(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false)

  const {sidebarAppBar, sidebarButtonRoot, sidebarButtonLabel, sidebarIdText} = classes

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
      setOpen(false)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" classes={{root: sidebarAppBar}}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" indicatorColor="primary">
          <Tab label="Conversations" {...a11yProps(0)} />
          <Tab label="Contacts" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Conversations />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Contacts />
      </TabPanel>
        
        <Typography
          classes={{root: sidebarIdText}}
        >
          Your ID is: <strong>{props.id}</strong>
        </Typography>
        <Button 
            type="submit"
            variant="contained"
            color="primary"
            fullWidth={true}
            classes={{root: sidebarButtonRoot, label: sidebarButtonLabel}}
            onClick={() => setOpen(true)}
            >
                New {value === 0 ? 'Conversation' : 'Contact'}
        </Button>
        {
            value === 0 ? <NewConversationModal open={open} onClose={handleClose}/> 
            : <NewContactModal open={open} onClose={handleClose}/>
        }
    </div>
  );
}
