import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../components/Context/User/userContext'

const Login = () => {
    const context = useContext(UserContext);
    const { login, loading } = context;
    const [input, setInput] = useState({
        userName: "",
        password: ""
    })
    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(input)
    }
    return <>
        <div className="flex flex-col items-center justify-center min-w-80 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-2xl bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Login
                    <span className='text-green-500'> ChatApp</span>
                </h1>
                <form onSubmit={handleSubmit}>
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
                            placeholder='Enter username'
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
                    <Link
                        to={"/signup"}
                        className='text-sm text-gray-300 hover:underline hover:text-green-500 mt-2 inline-block'
                    >
                        {"Don't"} have an account?
                    </Link>
                    <div>
                        <button
                            disabled={loading}
                            className='btn btn-block btn-sm btn-active btn-neutral mt-2'
                        >
                            {
                                loading ? <span className='loading loading-spinner'></span> : "Login"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
}

export default Login

// Starter Code For Login Page

// const Login = () => {
//     return <>
//         <div className="flex flex-col items-center justify-center min-w-80 mx-auto">
//             <div className="w-full p-6 rounded-lg shadow-2xl bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
//                 <h1 className='text-3xl font-semibold text-center text-gray-300'>
//                     Login
//                     <span className='text-green-500'> ChatApp</span>
//                 </h1>
//                 <form action="">
//                     <div>
//                         <label className="label p-2">
//                             <span className='text-base label-text text-gray-300'>Username:</span>
//                         </label>
//                         <input type="text" className='w-full input input-bordered h-10 bg-gray-800 text-white' placeholder='Enter username' name="" id="" />
//                     </div>
//                     <div>
//                         <label className="label p-2">
//                             <span className='text-base label-text text-gray-300'>Password:</span>
//                         </label>
//                         <input type="password" className='w-full input input-bordered h-10 bg-gray-800 text-white' placeholder='Enter password' name="" id="" />
//                     </div>
//                     <a href="#" className='text-sm text-gray-300 hover:underline hover:text-green-500 mt-2 inline-block'>
//                         {"Don't"} have an account?
//                     </a>
//                     <div>
//                         <button className='btn btn-block btn-sm btn-active btn-neutral mt-2'>
//                             Login
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     </>
// }

// export default Login