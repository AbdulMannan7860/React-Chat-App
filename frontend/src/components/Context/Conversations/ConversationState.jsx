import React, { useEffect, useState } from 'react';
import ConversationContext from './conversationContext.js';
import toast from 'react-hot-toast';
import useConversation from '../../../zustand/useConversations.js';

const ConversationState = (props) => {
    const { children, authUser } = props
    const host = import.meta.env.VITE_REACT_APP_HOST;
    const [conversations, setConversations] = useState([]);
    const { messages, setMessages, selectedConversation } = useConversation();
    const [loading, setLoading] = useState(false);
    const getConversation = async () => {
        try {
            const response = await fetch(`${host}/api/users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch conversations');
            }

            const data = await response.json();
            setConversations(data);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const sendMessages = async (message) => {
        setLoading(true);
        try {
            const response = await fetch(`${host}/api/messages/send/${selectedConversation._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ message })
            })
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            setMessages([...messages, data]);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
        return { sendMessages, loading }
    }

    const getMessages = async () => {
        try {
            const response = await fetch(`${host}/api/messages/${selectedConversation._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }

            const data = await response.json();
            setMessages(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (selectedConversation && (selectedConversation?._id, setMessages)) {
            getMessages();
        }
    }, [selectedConversation, setMessages]);

    useEffect(() => {
        getConversation();
    }, [authUser]);

    return (

        <ConversationContext.Provider
            value={{
                conversations,
                setConversations,
                sendMessages,
                loading
            }}
        >
            {children}
        </ConversationContext.Provider>

    );
};

export default ConversationState;
