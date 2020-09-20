import React from 'react'

import Grid from '@material-ui/core/Grid'

import Sidebar from './Sidebar'
import OpenConversation from './OpenConversation'

import {useConversations} from '../../contexts/ConversationsProvider'
import {useContacts} from '../../contexts/ContactsProvider'

const Dashboard = (props) => {
    const {contacts} = useContacts()
    const {conversations, selectedConversation} = useConversations()

    // console.log('Contacts:', contacts)
    // console.log('Conversations:', conversations)
    return (
        <Grid container>
            <Grid item xs={12} md={3}>
                <Sidebar id={props.id}/>
            </Grid>

            <Grid item x2={12} md={9}>
               {selectedConversation ? <OpenConversation /> : null}
            </Grid>
        </Grid>
    )
}

export default Dashboard
