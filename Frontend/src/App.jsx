import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'
import LoginPage from './Components/LoginPage'
import SignUp from './Components/SignUp'
import Home from './Screens/Home';
import Chat from './Chat';
import IdentificationPage from './Components/IdentificationPage'
function App() {
  const [count, setCount] = useState(0)
  const [isLoggedIn, setLogin] = useState(false)

  const handleLogin = () => {
    setLogin(true)
  }

  const handleLogout = () => {
    setLogin(false)
  }

  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} setLogin={handleLogin} />}  />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home isLoggedIn={isLoggedIn} />} />
          </Routes>
        </Router>
    </>
  )
}

export default App
