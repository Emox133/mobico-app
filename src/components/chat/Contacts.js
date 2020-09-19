import React from 'react'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import {useContacts} from '../../contexts/ContactsProvider'

const Contacts = () => {
    const {contacts} = useContacts()
   
    return (
        contacts.map(contact => (
            <ListItem
                key={contact.id}
            >
                <ListItemText
                    primary={contact.name}
                    secondary={contact.id}
                />
            </ListItem>
        ))
    )
}

export default Contacts
