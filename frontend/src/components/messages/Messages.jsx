import React, { useEffect, useRef } from 'react'
import Message from './message/Message'
import useConversation from '../../zustand/useConversations'
import MessageSkeletons from './skeletons/MessageSkeletons';

const Messages = () => {
    const { messages, loading } = useConversation();
    const lastMessageRef = useRef(null);
    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages])
    return (
        <div className='px-4 flex-1 overflow-auto'>
            {!loading && messages.length > 0 && messages.map((message, idx) => (
                <div
                    key={message._id}
                    ref={idx === messages.length - 1 ? lastMessageRef : null}
                >
                    <Message message={message} />
                </div>
            ))}
            {loading && [...Array(3)].map((_, idx) => <MessageSkeletons key={idx} />)}
            {!loading && messages.length === 0 && (
                <p className='text-center text-gray-300'>Send a message to start the conversation</p>
            )}
        </div>
    )
}

export default Messages

// STARTER CODE SNIPPET
// import React from 'react'
// import Message from './message/Message'

// const Messages = () => {
//   return (
//     <div className='px-4 flex-1 overflow-auto'>
//         <Message />
//         <Message />
//         <Message />
//         <Message />
//         <Message />
//         <Message />
//         <Message />
//         <Message />
//         <Message />
//         <Message />
//     </div>
//   )
// }

// export default Messages