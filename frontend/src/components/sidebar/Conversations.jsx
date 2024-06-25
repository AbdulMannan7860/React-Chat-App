import React from 'react'
import Conversation from './Conversation Components/Conversation'

const Conversations = ({ conversations }) => {
    return <>
        <div className='py-2 flex flex-col'>
            {conversations.map((conversation, index) => (
                <Conversation key={index} conversation={conversation} />
            ))}
        </div>
    </>
}

export default Conversations

// STARTER CODE SNIPPET
// import React from 'react'
// import Conversation from './Conversation Components/Conversation'

// const Conversations = () => {
//     return <>
//         <div className='py-2 flex flex-col overflow-auto'>
//             <Conversation />
//             <Conversation />
//             <Conversation />
//             <Conversation />
//             <Conversation />
//             <Conversation />
//             <Conversation />
//             <Conversation />
//             <Conversation />
//             <Conversation />
//         </div>
//     </>
// }

// export default Conversations