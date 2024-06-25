import React, { useContext, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import UserState from './components/Context/User/UserState'
import ConversationState from './components/Context/Conversations/ConversationState'
import SocketState from './components/Context/SocketContext/SocketState'
import { Toaster } from 'react-hot-toast'

function App() {
  const getUser = JSON.parse(localStorage.getItem("chat-user"))
  const [authUser, setAuthUser] = useState(getUser || null)
  return (
    <>
      <SocketState  authUser={authUser}>
        <UserState setAuthUser={setAuthUser} authUser={authUser}>
          <ConversationState setAuthUser={setAuthUser} authUser={authUser}>
            <div className="p-4 h-screen flex items-center justify-center">
              <Routes>
                <Route path="/" element={authUser ? <Home /> : <Navigate to='/login' />} />
                <Route path="/login" element={authUser ? <Navigate to='/' /> : <Login />} />
                <Route path="/signup" element={authUser ? <Navigate to='/' /> : <Signup />} />
              </Routes>
              <Toaster />
            </div>
          </ConversationState>
        </UserState>
      </SocketState>
    </>
  )
}

export default App
