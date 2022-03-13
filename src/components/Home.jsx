import React, { useState, useEffect } from 'react'
import "./components.css"
import QueryCarByID from './QueryCarByID'
import Profile from './Profile'
import { useLocation } from 'react-router-dom'
import SellCar from './SellCar'

function Home(state) {

  const location = useLocation() //for passing accessToken from login

  const [page, setPage] = useState({
    profile: true,
    queryCarByID: false,
    addCar: false,
    sellCar: false,
    showAssetHistory: false
  })

  const accessToken = location.state

  useEffect(() => {

  }, [page])


  return (
    <div>
        <div className='home_header'>
        <h1>Welcome Home</h1>
        <div className='homePageBtns'>
            <button onClick={() => {setPage({profile: true, queryCarByID: false, addCar: false, sellCar: false})}}>User Profile</button>
            <button onClick={() => {setPage({profile: false, queryCarByID: true, addCar: false, sellCar: false})}}>QueryCarByID</button>
            <button onClick={() => {setPage({profile: false, queryCarByID: false, addCar: false, sellCar: true})}}>SellCar</button>
        </div>
        </div>
        <hr/>
        <div className='container' >
          {page.profile && <Profile accessToken={accessToken}/>}
          {page.queryCarByID && <QueryCarByID accessToken={accessToken}/>}
          {page.sellCar && <SellCar accessToken={accessToken} />}
        </div>
    </div>
  )
}

export default Home