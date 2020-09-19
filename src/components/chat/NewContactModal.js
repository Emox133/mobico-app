import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TextField from '@material-ui/core/TextField'
import { useTheme } from '@material-ui/core/styles';
import {useContacts} from '../../contexts/ContactsProvider'

export default function NewContactModal(props) {
  const [fields, setFields] = useState({
      id: '',
      name: ''
  })
  const {open, onClose} = props
  const {createContact} = useContacts() 
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = (e) => {
      e.preventDefault()

      createContact(fields.id, fields.name)

      onClose()
    }

    const handleChange = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })

        console.log(fields.id, fields.name)
    }
    
  return (
    <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
    >
    <form onSubmit={handleSubmit}>
    <DialogTitle id="responsive-dialog-title">{"Please provide credentials for creating new contact."}</DialogTitle>
    <DialogContent>
        <TextField
        type="text"
        id="id"
        name="id"
        value={fields.id} 
        variant="standard"
        label="ID"
        // placeholder="Provide an ID."
        // autoFocus={true}
        fullWidth={true}
        required={true}
        onChange={handleChange}
        />
        <TextField
        type="text"
        id="name"
        name="name"
        value={fields.name} 
        variant="standard"
        label="name"
        // placeholder="Provide an ID."
        // autoFocus={true}
        fullWidth={true}
        required={true}
        onChange={handleChange}
        />
    </DialogContent>
    <DialogActions>
        <Button autoFocus onClick={onClose} color="secondary">
        Cancel
        </Button>
        <Button type="submit" color="primary">
        Create
        </Button>
    </DialogActions>
    </form>
    </Dialog>
  );
}
