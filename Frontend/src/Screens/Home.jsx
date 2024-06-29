import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import img from "../assets/Home.png"
import i1 from "../assets/1.jpg"
import Construction_logo from "../assets/Construction.svg"

import "./Home.css"


export default function Home(props) {
  const navigate = useNavigate();

  const handleNotLoggedIn = () => {
    navigate("/login")
  }

  return (

    <>

      <div className='h-[100vh] w-[100vw] md:hidden block '>
      
        <div className='flex justify-center pt-[150px] md:pt-[150px]'>

          <div className='pb-[50px] w-[90%] h-fit flex md:flex-row gap-y-[30px] flex-col justify-evenly gap-x-[10vw] items-center '>

            <img className='h-[300px] md:h-[35vw]' src={Construction_logo} alt="" />
            <div className=' flex flex-col items-center justify-evenly gap-y-[30px]'>
              <h1 className=' text-[30px] md:text-[3.5vw] text-center text-[#1B3540]'>Oops! We are still making our website responsive</h1>
              <a href="/home">
                <button className='bg-[#f2f2ff] w-[250px] h-[50px] rounded-[7px] border border-[#6C63FF] '>Go Back to Home</button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="main-container md:flex hidden">
        <div className="sub-main-container">
          <div className="sub-main-left-container">
            <div className="logo-container">
              <h1>Beatly</h1>
            </div>
            <div className="link-container">
              <ul>
                <li>Home</li>
                <li>Search</li>
                <li>Music Control</li>
                <li>Yore Library</li>
                <li>Tickets</li>
              </ul>
            </div>
            <div className="profile-container">
              <div className="profile-main-className">
                <div className="profile-photo"></div>
                <div className="profile-name">User Name</div>
              </div>
            </div>
          </div>
          <div className="sub-main-right-container">
            <div className="top-sub-main-right-container">
              <div className="story-container">
                <div className="story1">
                  <img src={i1} alt="" />
                  <h3>@zaynmalik</h3>
                </div>
                <div className="story1">
                  <img src={i1} alt="" />
                  <h3>@billieellish</h3>
                </div>
                <div className="story1">
                  <img src={i1} alt="" />
                  <h3>@zaynmalik</h3>
                </div>
                <div className="story1">
                  <img src={i1} alt="" />
                  <h3>@zaynmalik</h3>
                </div>
              </div>
            </div>
            <div className="bottom-sub-main-right-container">
              <div className="bottom-sub-main-right-container">
                <div className="news-box-1">
                  <div className="news-className">
                    <div className="left-news-className-part">
                      <img src="news-profile-1.jpg" alt="" />
                      <div className="text">
                        <h3>Billie Eilish</h3>
                        <h4>@BillieEilish</h4>
                      </div>

                    </div>
                    <div className="right-news-className-part">
                      <h5>10hr ago</h5>
                    </div>

                  </div>
                  <div className="news-className">
                    <h4>Dropping a song tonight 8 pm</h4>
                  </div>
                  <div className="news-className">
                    <img className="news-photo" src={img} alt="" />
                  </div>
                  <div className="news-className1">
                    <div className="logo-className-1">
                      <i className="fa-regular fa-heart" ></i> 1.2k
                    </div>


                    <div className="logo-className-1">
                      <i className="fa-regular fa-comment" ></i>1k
                    </div>


                    <div className="logo-className-1">
                      <i className="fa-solid fa-share-nodes" ></i>1k
                    </div>

                  </div>
                </div>
                <div className="news-box-1">
                  <div className="news-className">
                    <div className="left-news-className-part">
                      <img src="news-profile-1.jpg" alt="" />
                      <div className="text">
                        <h3>Billie Eilish</h3>
                        <h4>@BillieEilish</h4>
                      </div>

                    </div>
                    <div className="right-news-className-part">
                      <h5>10hr ago</h5>
                    </div>

                  </div>
                  <div className="news-className">
                    <h4>Dropping a song tonight 8 pm</h4>
                  </div>
                  <div className="news-className">
                    <img className="news-photo" src={img} alt="" />
                  </div>
                  <div className="news-className1">
                    <div className="logo-className-1">
                      <i className="fa-regular fa-heart" ></i> 1.2k
                    </div>


                    <div className="logo-className-1">
                      <i className="fa-regular fa-comment"></i>1k
                    </div>


                    <div className="logo-className-1">
                      <i className="fa-solid fa-share-nodes"></i>1k
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
