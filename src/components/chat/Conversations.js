import React from 'react'
import {useConversations} from '../../contexts/ConversationsProvider'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const Conversations = () => {
    const {conversations, selectConversationIndex} = useConversations()

    return (
        conversations.map((conversation, index) => (
            <ListItem
                key={index}
                onClick={() => selectConversationIndex(index)}
                style={{cursor: 'pointer'}}
                selected={conversation.selected}
            >
                <ListItemText 
                    primary={conversation.recipients.map(recipient => recipient.name).join`,`}
                />
            </ListItem>
        ))
    )
}

export default Conversations
