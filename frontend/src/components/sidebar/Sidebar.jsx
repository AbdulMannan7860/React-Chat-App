import React, { useContext } from 'react'
import SearchBar from './SearchBar'
import Logout from './Logout.jsx'
import Conversations from './Conversations'
import ConversationState from '../Context/Conversations/conversationContext.js'

const Sidebar = () => {
    const context = useContext(ConversationState);
    const { conversations } = context;

    return <>
        <div className='border-r border-slate-500 p-4 flex-col overflow-auto'>
            <SearchBar />
            <div className="divider divider-neutral px-3"></div>
            <Conversations conversations={conversations} />
            <Logout />
        </div>
    </>
}

export default Sidebar

// STARTER CODE SNIPPET
// import React from 'react'
// import SearchBar from './SearchBar'
// import Logout from './Logout.jsx'
// import Conversations from './Conversations'

// const Sidebar = () => {
//     return <>
//         <div className='border-r border-slate-500 p-4 flex-col'>
//             <SearchBar />
//             <div className="divider divider-neutral px-3"></div>
//             <Conversations />
//             <Logout />
//         </div>
//     </>
// }

// export default Sidebar