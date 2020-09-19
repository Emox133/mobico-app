import React, {useState} from 'react'
import {useConversations} from '../../contexts/ConversationsProvider'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
    list: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    fromMeListItem: {
        width: 'fit-content',
        maxWidth: '250px',
        wordBreak: 'break-all',
        padding: '0 10px',
        marginRight: '15px',
        background: '#00c9ff',
        borderRadius: '3px',
        alignSelf: 'flex-end'
    },
    notFromMeListItem: {
        width: 'fit-content',
        maxWidth: '250px',
        wordBreak: 'break-all',
        padding: '0 10px',
        borderRadius: '3px',
        border: '1px solid #ccc'
    }
})

const OpenConversation = () => {
    const classes = useStyles()
    console.log(classes)
    const [text, setText] = useState('')
    const {selectedConversation, sendMessage} = useConversations()
    console.log(selectedConversation)

    const handleSubmit = (e) => {
        e.preventDefault()

        sendMessage(selectedConversation.recipients.map(r => r.id), text)
     
        setText('')
    }

    const {fromMeListItem, notFromMeListItem, list} = classes

    return (
        <div style={{height: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1}}>
            <div style={{flexGrow: 1, overflow: 'auto'}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'end', padding: '0 8px'}}>
                    <List classes={{root: list}}>
                        {selectedConversation.messages.map((message, index) => (
                            <ListItem
                                key={index}
                                classes={{root: message.fromMe ? fromMeListItem : notFromMeListItem}}
                            >
                                <ListItemText 
                                    primary={message.text}
                                    secondary={message.fromMe ? 'You' : message.senderName}
                                    
                                />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </div>

            <form style={{height: 'auto'}} onSubmit={handleSubmit}>
                <TextField 
                    multiline={true}
                    rows={2}
                    variant="outlined"
                    placeholder="Type your message here ..."
                    // fullWidth={true}
                    style={{width: '75%'}}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{height: '100%', width: '25%', borderRadius: 0}}
                >
                    Send Message
                </Button>
            </form>
        </div>
    )
}

export default OpenConversation
