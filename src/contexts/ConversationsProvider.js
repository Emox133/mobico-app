import React, {useContext, useState, useCallback, useEffect} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import {useContacts} from './ContactsProvider'
import {useSocket} from './SocketProvider'

const ConversationsContext = React.createContext()

export const useConversations = () => {
   return useContext(ConversationsContext)
}

export function ConversationsProvider({children, id}) {
    const [conversations, setConversations] = useLocalStorage('conversations', [])
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
    const {contacts} = useContacts()
    const socket = useSocket()

    const createConversations = (recipients) => {
        setConversations(prevConversations => (
            [...prevConversations, {recipients, messages: []}]
        ))
    }

    const formattedConversations = conversations.map((conversation, index) => {
        const recipients = conversation.recipients.map(recipient => {
            const contact = contacts.find(contact => contact.id === recipient)
            const name = (contact && contact.name) || recipient
            return {id: recipient, name}
        })

        const messages = conversation.messages.map(message => {
            const contact = contacts.find(contact => {
              return contact.id === message.sender
            })
            const name = (contact && contact.name) || message.sender
            const fromMe = id === message.sender
            return { ...message, senderName: name, fromMe }
          })
          
          const selected = index === selectedConversationIndex
          return { ...conversation, messages, recipients, selected }
    })

    const addMessageToConversation = useCallback(({recipients, text, sender}) => {
        setConversations(prevConversations => {
            let conversationExists = false
            const newMessage = {sender, text}
            
            const newConversations = prevConversations.map(conversation => {
                if(arrayEquality(conversation.recipients, recipients)) {
                    conversationExists = true
                    return {
                        ...conversation,
                        messages: [...conversation.messages, newMessage]
                    }
                } 
                return conversation
            })

            if(conversationExists) {
               return newConversations
            } else {
                return [...prevConversations, {recipients, messages: [newMessage]}]
            }
        })
    }, [setConversations])

    useEffect(() => {
        if (socket == null) return
    
        socket.on('receive-message', addMessageToConversation)
    
        return () => socket.off('receive-message')
      }, [socket, addMessageToConversation])

    const sendMessage = (recipients, text) => {
        socket.emit('send-message', { recipients, text })

        addMessageToConversation({recipients, text, sender: id})
    }

    const value = {
        conversations: formattedConversations,
        createConversations,
        selectConversationIndex: setSelectedConversationIndex,
        selectedConversation: formattedConversations[selectedConversationIndex],
        sendMessage
    }

    return (
        <ConversationsContext.Provider value={value}> 
            {children}
        </ConversationsContext.Provider>
    )
}

const arrayEquality = (a, b) => {
    if(a.length !== b.length) return false

    a.sort()
    b.sort()

    return a.every((el, i) => (
        el === b[i]
    )) 
}