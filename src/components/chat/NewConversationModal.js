import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {useContacts} from '../../contexts/ContactsProvider'
import {useConversations} from '../../contexts/ConversationsProvider'

import Checkbox from '@material-ui/core/Checkbox'
import { useTheme } from '@material-ui/core/styles';

export default function NewConversationModal(props) {
  const [selectedRecipients, setSelectedRecipients] = useState([])
  const {contacts} = useContacts()
  const {createConversations} = useConversations()
  const {open, onClose} = props
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCheckboxChange = (contactId) => {
    setSelectedRecipients(prevRecipients => {
      if(prevRecipients.includes(contactId)) {
        return prevRecipients.filter(recipient => contactId !== recipient.id)
      } else {
       return [...prevRecipients, contactId]
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    createConversations(selectedRecipients)

    onClose()
  }

  return (
    <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <form onSubmit={handleSubmit}>
        <DialogTitle id="responsive-dialog-title">{"Please mark contacts for new conversation."}</DialogTitle>
        <DialogContent>
          <FormGroup>
            {contacts.map(contact => (
              <FormControlLabel 
                key={contact.id}
                control={ <Checkbox color="primary" /> }
                label={contact.name}     
                onChange={(id) => handleCheckboxChange(contact.id)}      
              />
            ))}
          </FormGroup>
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
