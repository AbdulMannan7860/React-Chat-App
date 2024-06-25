import React, { useContext } from 'react'
import useConversations from '../../../zustand/useConversations'
import SocketContext from '../../Context/SocketContext/SocketContext';
const Conversation = (props) => {
    const convo = props.conversation;
    const context = useContext(SocketContext);
    const { onlineUsers } = context;
    const isOnline = onlineUsers.includes(convo._id);
    const { selectedConversation, setSelectedConversation } = useConversations();
    const isSelected = selectedConversation?._id === convo._id;
    const emojis = ['😊', '😉', '😎', '😃', '😮', '😱', '🤠', '😇', '🤓', '🧐'];
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return (
        <>
            <div className={`flex gap-2 items-center hover:bg-green-900 rounded p-2 py-1 cursor-pointer ${isSelected ? 'bg-green-700' : ''}`}
                onClick={() => setSelectedConversation(convo)}
            >
                <div className={`avatar ${isOnline && "online"}`}>
                    <div className="w-12 rounded-full">
                        <img
                            src={convo.profilePic}
                            alt="user Avatar"
                        />
                    </div>
                </div>

                <div className='flex flex-col flex-1'>
                    <div className='flex gap-2 justify-between'>
                        <p className='font-bold text-gray-200'>{convo.userName}</p>
                        <span className='text-xl'>{emojis[randomIndex]}</span>
                    </div>
                </div>
            </div>
            <div className='divider my-0 py-0 h-1 divide-neutral'></div>
        </>
    )
}

export default Conversation

// STARTER CODE SNIPPET
// import React from 'react'

// const Conversation = () => {
//     return (
//         <>
//             <div className='flex gap-2 items-center hover:bg-green-500 rounded p-2 py-1 cursor-pointer'>
//                 <div className="avatar online">
//                     <div className="w-12 rounded-full">
//                         <img
//                             src="https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
//                             alt="user Avatar"
//                         />
//                     </div>
//                 </div>

//                 <div className='flex flex-col flex-1'>
//                     <div className='flex gap-2 justify-between'>
//                         <p className='font-bold text-gray-200'>John Doe</p>
//                         <span className='text-xl'>😎</span>
//                     </div>
//                 </div>
//             </div>
//             <div className='divider my-0 py-0 h-1 divide-neutral'></div>
//         </>
//     )
// }

// export default Conversation