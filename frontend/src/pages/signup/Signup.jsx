import React, { useState, useContext } from 'react'
import GenderCheck from './GenderCheck'
import { Link } from 'react-router-dom'
import UserContext from '../../components/Context/User/userContext'

const Signup = () => {
    const context = useContext(UserContext);
    const { signup, loading } = context;
    const [input, setInput] = useState({
        fullName: '',
        userName: '',
        password: '',
        confirmPassword: '',
        gender: '',
    });
    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(input)
    }
    return (
        <div
            className='flex flex-col items-center justify-center min-w-96 mx-auto'
        >
            <div
                className="p-6 h-full w-full bg-green-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5"
            >
                <h1
                    className='text-3xl font-semibold text-center text-gray-300'
                >
                    Sign Up
                    <span
                        className='text-green-500'
                    >
                        &nbsp;ChatApp
                    </span>
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <label
                                className="label p-2"
                            >
                                <span
                                    className='text-base label-text text-gray-300'
                                >
                                    Full Name:
                                </span>
                            </label>
                            <input
                                type="text"
                                className='w-full input input-bordered h-10 bg-gray-800 text-white'
                                placeholder='Enter fullname'
                                onChange={handleInputChange}
                                name="fullName"
                                id="fullName"
                            />
                        </div>
                        <div>
                            <label
                                className="label p-2"
                            >
                                <span
                                    className='text-base label-text text-gray-300'
                                >
                                    Username:
                                </span>
                            </label>
                            <input
                                type="text"
                                className='w-full input input-bordered h-10 bg-gray-800 text-white'
                                placeholder='Enter Username'
                                name="userName"
                                id="userName"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label
                                className="label p-2"
                            >
                                <span
                                    className='text-base label-text text-gray-300'
                                >
                                    Password:
                                </span>
                            </label>
                            <input
                                type="password"
                                className='w-full input input-bordered h-10 bg-gray-800 text-white'
                                placeholder='Enter password'
                                name="password"
                                id="password"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="label p-2">
                                <span className='text-base label-text text-gray-300'>Confirm Password:</span>
                            </label>
                            <input
                                type="password"
                                className='w-full input input-bordered h-10 bg-gray-800 text-white'
                                placeholder='Confirm password'
                                name="confirmPassword"
                                id="confirmPassword"
                                onChange={handleInputChange}
                            />
                        </div>
                        <GenderCheck handleInputChange={handleInputChange} input={input} />
                        <Link
                            to={"/login"}
                            className='text-sm text-gray-300 hover:underline hover:text-green-500 mt-2 inline-block'
                        >
                            Already have an account?
                        </Link>
                        <div>
                            <button
                                disabled={loading}
                                className='btn btn-block btn-sm btn-active btn-neutral mt-2'
                            >
                                {
                                    loading ? <span className='loading loading-spinner'></span> : "Sign Up"
                                }
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup

// Starter Code For Signup Page
// import React from 'react'
// import GenderCheck from './GenderCheck'

// const Signup = () => {
//     return (
//         <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
//             <div className='w-full p-6 rounded-lg shadow-2xl bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
//                 <h1 className='text-3xl font-semibold text-center text-gray-300'>
//                     Sign Up
//                     <span className='text-green-500'> ChatApp</span>
//                 </h1>
//                 <form>
//                     <div>
//                         <div>
//                             <label className="label p-2">
//                                 <span className='text-base label-text text-gray-300'>Full Name:</span>
//                             </label>
//                             <input type="text" className='w-full input input-bordered h-10 bg-gray-800 text-white' placeholder='Enter fullname' name="" id="" />
//                         </div>
//                         <div>
//                             <label className="label p-2">
//                                 <span className='text-base label-text text-gray-300'>Username:</span>
//                             </label>
//                             <input type="text" className='w-full input input-bordered h-10 bg-gray-800 text-white' placeholder='Enter Username' name="" id="" />
//                         </div>
//                         <div>
//                             <label className="label p-2">
//                                 <span className='text-base label-text text-gray-300'>Password:</span>
//                             </label>
//                             <input type="password" className='w-full input input-bordered h-10 bg-gray-800 text-white' placeholder='Enter password' name="" id="" />
//                         </div>
//                         <div>
//                             <label className="label p-2">
//                                 <span className='text-base label-text text-gray-300'>Confirm Password:</span>
//                             </label>
//                             <input type="password" className='w-full input input-bordered h-10 bg-gray-800 text-white' placeholder='Confirm password' name="" id="" />
//                         </div>
//                         <GenderCheck />
//                         <a href="#" className='text-sm text-gray-300 hover:underline hover:text-green-500 mt-2 inline-block'>
//                             Already have an account?
//                         </a>
//                         <div>
//                             <button className='btn btn-block btn-sm btn-active btn-neutral mt-2'>
//                                 Sign Up
//                             </button>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Signup