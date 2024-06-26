import React, { useEffect, useState } from 'react'
import SocketContext from './SocketContext'
import io from 'socket.io-client'
import useConversations from '../../../zustand/useConversations'

const SocketState = (props) => {
    const { children, authUser } = props;
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { messages, setMessages } = useConversations();
    const currentTime=  new Date().toLocaleTimeString();
    console.log(currentTime);
    useEffect(() => {
        if (authUser) {
            const socket = io("http://localhost:8000", {
                query: {
                    userId: authUser._id
                }
            })

            setSocket(socket);

            // socket.on() is used to listen for events, can be used on client and server
            socket.on("user-ids", (userIds) => {
                setOnlineUsers(userIds);
            })

            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    useEffect(() => {
        socket?.on("new-message", (data) => {
            data.shouldShake = true;
            setMessages([...messages, data]);
        })

        return () => socket?.off("new-message");
    }, [socket, messages, setMessages])

    return (
        <SocketContext.Provider
            value={{
                socket,
                onlineUsers,
            }}
        >
            {children}
        </SocketContext.Provider>
    )
}

export default SocketState