import { useState } from 'react'
import './App.css'
import LoginPage from './Components/LoginPage'
import SignUp from './Components/SignUp'
import IdentificationPage from './Components/IdentificationPage'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <LoginPage/> */}
    {/* <SignUp/> */}
    <IdentificationPage/>
    </>
  )
}

export default App
