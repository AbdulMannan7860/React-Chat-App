import React, { useContext, useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import ConversationContext from '../Context/Conversations/conversationContext';
import useConversation from '../../zustand/useConversations';
import toast from 'react-hot-toast';
const SearchBar = () => {
    const context = useContext(ConversationContext);
    const { conversations } = context;
    const [search, setSearch] = useState('');
    const { setSelectedConversation } = useConversation();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search) return;
        if (search.length < 3) {
            toast.error("Please enter at least 3 characters");
            return;
        }

        const conversation = conversations.find((c) => c.userName.toLowerCase() === search.toLowerCase());
        if (!conversation) {
            toast.error("Conversation not found");
            return;
        }
        setSelectedConversation(conversation);
        setSearch('');
    }
    return <>
        <form className='flex items-center gap-2 m-2' onSubmit={handleSubmit}>
            <input type="text" placeholder='Search...' value={search} onChange={(e) => setSearch(e.target.value)} className='input input-bordered rounded-full bg-gray-800 text-white' />
            <button type='submit' className='btn btn-circle border-0 bg-green-800 text-gray-300 hover:bg-gray-800'>
                <IoSearchSharp className='w-6 h-6 outline-none' />
            </button>
        </form>
    </>
}

export default SearchBar

// STARTER CODE SNIPPET
// import React from 'react'
// import { IoSearchSharp } from "react-icons/io5";
// const SearchBar = () => {
//     return <>
//         <form className='flex items-center gap-2 m-2'>
//             <input type="text" placeholder='Search...' className='input input-bordered rounded-full bg-gray-800' />
//             <button type='submit' className='btn btn-circle border-0 bg-green-800 text-gray-300 hover:bg-gray-800'>
//                 <IoSearchSharp className='w-6 h-6 outline-none' />
//             </button>
//         </form>
//     </>
// }

// export default SearchBar