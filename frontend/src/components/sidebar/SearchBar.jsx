import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
const SearchBar = () => {
    return <>
        <form className='flex items-center gap-2 m-2'>
            <input type="text" placeholder='Search...' className='input input-bordered rounded-full bg-gray-800' />
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