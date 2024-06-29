import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import img from "../assets/Home.png"


export default function Home(props) {
  const navigate = useNavigate();

  const handleNotLoggedIn = () => {
    navigate("/login")
  }

  return (

    <>

      {
        props.isLoggedIn ?

          <div>Logged in</div>
          :
          // navigate("/login")
          <div>Not logged in</div>
  
      }

    </>
  )
}
