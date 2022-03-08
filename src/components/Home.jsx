import React, { useState, useEffect } from 'react'
import AddCar from './QueryCarByID'
import Profile from './Profile'

function Home() {

  const [page, setPage] = useState(0)
  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDY4MDcxNDYsInVzZXJuYW1lIjoiemVuIiwib3JnTmFtZSI6Ik9yZzIiLCJpYXQiOjE2NDY3NzExNDZ9.h4t56W0_baFtSkVqYcoII9pzJbpNTGeqasJ_iRtsNYA" 

  return (
    <div>
        <h1>Welcome Home</h1>
        <div className='home_header'>
          <button>Profile</button>
          <button>AddCars</button>
          <button>ShowTx</button>
        </div>
        <div className='container' >
          <Profile accessToken={accessToken}/>
          <hr></hr>
          <AddCar accessToken={accessToken}/>
        </div>
    </div>
  )
}

export default Home