import React from 'react'
import LoginChat from '../components/chat/LoginChat'
import Dashboard from '../components/chat/Dashboard'
import {ContactsProvider} from '../contexts/ContactsProvider'
import {ConversationsProvider} from '../contexts/ConversationsProvider'
import {SocketProvider} from '../contexts/SocketProvider'
import useLocalStorage from '../hooks/useLocalStorage'

const Chat = () => {
    const [id, setId] = useLocalStorage('id', '')

    const dashboard = (
        <SocketProvider id={id}>
            <ContactsProvider>
                <ConversationsProvider id={id}>
                <Dashboard id={id}/> 
                </ConversationsProvider>
            </ContactsProvider>
        </SocketProvider>
    )

    return (
        id ? dashboard : <LoginChat onSetId={setId}/>
    )
}

export default Chat
