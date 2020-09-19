import React from 'react'

import Grid from '@material-ui/core/Grid'

import Sidebar from './Sidebar'
import OpenConversation from './OpenConversation'

import {useConversations} from '../../contexts/ConversationsProvider'
import {useContacts} from '../../contexts/ContactsProvider'

const Dashboard = (props) => {
    const {contacts} = useContacts()
    const {conversations, selectedConversation} = useConversations()

    console.log('Contacts:', contacts)
    console.log('Conversations:', conversations)
    return (
        <Grid container>
            <Grid item md={3}>
                <Sidebar id={props.id}/>
            </Grid>

            <Grid item md={9}>
               {selectedConversation ? <OpenConversation /> : null}
            </Grid>
        </Grid>
    )
}

export default Dashboard
