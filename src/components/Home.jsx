import React, { useState, useEffect } from 'react'
import "./components.css"
import QueryCarByID from './QueryCarByID'
import Profile from './Profile'
import { useLocation } from 'react-router-dom'

function Home(state) {

  const location = useLocation()

  const [page, setPage] = useState({
    profile: true,
    queryCarByID: false,
    addCar: false
  })
  // figure a way to get token from login component
  // const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDY4ODIxNzAsInVzZXJuYW1lIjoiemVuIiwib3JnTmFtZSI6Ik9yZzIiLCJpYXQiOjE2NDY4NDYxNzB9.aAczvcqFkRm1laglnVaXmp4pkOZi3uAXX7F2DZEXbSU" 
  const accessToken = location.state

  return (
    <div>
        <div className='home_header'>
          <h1>Welcome Home</h1>
          <button onClick={() => {setPage({profile: true, queryCarByID: false, addCar: false})}}>Profile</button>
          <button onClick={() => {setPage({profile: false, queryCarByID: true, addCar: false})}}>QueryCarByID</button>
          <button onClick={() => {console.log(accessToken)}}>?</button>
        </div>
        <hr/>
        <div className='container' >
          {page.profile && <Profile accessToken={accessToken}/>}
          {page.queryCarByID && <QueryCarByID accessToken={accessToken}/>}
        </div>
    </div>
  )
}

export default Home