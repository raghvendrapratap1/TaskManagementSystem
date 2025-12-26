import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useContext } from 'react'
import { AuthContext } from './context'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  
const {user} = useContext(AuthContext);

  return user ? <Dashboard/> : (
    <>
      <Login/>
      <Register/>
    </>
  )
}

export default App
