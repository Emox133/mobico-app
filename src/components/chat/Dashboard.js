import React from 'react'

import Grid from '@material-ui/core/Grid'

import Sidebar from './Sidebar'
import OpenConversation from './OpenConversation'

import {useConversations} from '../../contexts/ConversationsProvider'
import {useContacts} from '../../contexts/ContactsProvider'
import {useMediaQuery} from '@material-ui/core'


const Dashboard = (props) => {
    const {contacts} = useContacts()
    const {conversations, selectedConversation} = useConversations()
    const isActive = useMediaQuery('(max-width: 600px)')
    
    // console.log('Contacts:', contacts)
    // console.log('Conversations:', conversations)
    return (
        <Grid container style={{width: '100%'}}>
            <Grid item xs={12} md={3}>
                <Sidebar id={props.id}/>
            </Grid>

            <Grid item xs={12} md={9} style={{order: !isActive ? 0 : -1, height: isActive ? '100vh' : null}}>
               {selectedConversation ? <OpenConversation /> : null}
            </Grid>
        </Grid>
    )
}

export default Dashboard
