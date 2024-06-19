import React from 'react'
import SearchBar from './SearchBar'
import Logout from './Logout.jsx'
import Conversations from './Conversations'

const Sidebar = () => {
    return <>
        <div className='border-r border-slate-500 p-4 flex-col'>
            <SearchBar />
            <div className="divider divider-neutral px-3"></div>
            <Conversations />
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