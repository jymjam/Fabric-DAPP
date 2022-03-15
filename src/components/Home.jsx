import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import "./components.css"
import QueryCarByID from './QueryCarByID'
import Profile from './Profile'
import SellCar from './SellCar'
import AddCar from './AddCar'

function Home(state) {

  const location = useLocation() //for passing accessToken from login
  const [accessToken] = useState(location.state)
  const [username, setUsername] = useState("")
  const [orgname, setOrgname] = useState("")

  const [page, setPage] = useState({
    profile: true,
    queryCarByID: false,
    addCar: false,
    sellCar: false,
    showAssetHistory: false
  })


  function parseJWT(token){
    try{
      return JSON.parse(atob(token.split('.')[1]))
    }catch(err){
      console.error("access token error")
    }
  }
  useEffect(() => {
    const decodedJWT = parseJWT(accessToken)
    setUsername(decodedJWT.username)
    setOrgname(decodedJWT.orgName)
  })


  useEffect(() => {}, [page])

  return (
    <div>
        <div className='home_header'>
        <h1>Welcome Home</h1>
        <div className='homePageBtns'>
            <button onClick={() => {setPage({profile: true, queryCarByID: false, addCar: false, sellCar: false})}}>User Profile</button>
            <button onClick={() => {setPage({profile: false, queryCarByID: true, addCar: false, sellCar: false})}}>QueryCarByID</button>
            <button onClick={() => {setPage({profile: false, queryCarByID: false, addCar: true, sellCar: false})}}>Add Car</button>
            <button onClick={() => {setPage({profile: false, queryCarByID: false, addCar: false, sellCar: true})}}>Sell Car</button>
        </div>
        </div>
        <hr/>
        <div className='container' >
          {page.profile && <Profile accessToken={accessToken}/>}
          {page.queryCarByID && <QueryCarByID accessToken={accessToken}/>}
          {page.addCar && <AddCar ownerName={username} accessToken={accessToken} />}
          {page.sellCar && <SellCar accessToken={accessToken} />}
        </div>
    </div>
  )
}

export default Home