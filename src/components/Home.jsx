import React, { useState, useEffect } from 'react'
import "./components.css"
import QueryCarByID from './QueryCarByID'
import Profile from './Profile'

function Home() {

  const [page, setPage] = useState({
    profile: true,
    queryCarByID: false,
    addCar: false
  })
  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDY4MDcxNDYsInVzZXJuYW1lIjoiemVuIiwib3JnTmFtZSI6Ik9yZzIiLCJpYXQiOjE2NDY3NzExNDZ9.h4t56W0_baFtSkVqYcoII9pzJbpNTGeqasJ_iRtsNYA" 

  return (
    <div>
        <div className='home_header'>
          <h1>Welcome Home</h1>
          <button onClick={() => {setPage({profile: true, queryCarByID: false, addCar: false})}}>Profile</button>
          <button onClick={() => {setPage({profile: false, queryCarByID: true, addCar: false})}}>QueryCarByID</button>
          <button onClick={() => {setPage({profile: true, queryCarByID: false, addCar: true})}}>logout</button>
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