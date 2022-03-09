import React, { useEffect, useState } from 'react'
import "./components.css"

function Profile({accessToken}) {

    const [username, setUsername] = useState()
    const [orgname, setOrgname] = useState()

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

  return (
    <div className='home_child_component'>
        <h1>User Profile</h1>
        <div className="profileName"><p>Name: </p><p>{username}</p></div>
        <div className="profileAff"><p>Affiliation:</p> <p>{orgname}</p></div>
    </div>
  )
}

export default Profile