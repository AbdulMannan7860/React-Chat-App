import React, { useContext } from 'react'
import UserContext from '../../Context/User/userContext'
import useConversation from '../../../zustand/useConversations';

const Message = ({ message }) => {
    const context = useContext(UserContext);
    const { authUser } = context;
    const { selectedConversation } = useConversation();
    const fromMe = message.senderId === authUser._id;
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    const chatBubble = fromMe ? "bg-green-500" : "";
    const extractTime = (dateString) => {
        const date = new Date(dateString);
        const hours = padZero(date.getHours());
        const minutes = padZero(date.getMinutes());
        return `${hours}:${minutes}`;
    }
    const padZero = (num) => {
        return num.toString().padStart(2, '0');
    }
    const formattedTime = message.createdAt && extractTime(message.createdAt)

    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img
                        src={profilePic}
                        alt="Tailwind CSS chat bubble component"
                    />
                </div>
            </div>
            <div className={`chat-bubble text-white ${chatBubble} pb-2`}>
                {message.message}
            </div>
            <div className="chat-footer opacity-50 text-white text-xs flex gap-1 items-center">
                {formattedTime}
            </div>
        </div>
    )
}

export default Message