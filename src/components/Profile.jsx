import React, { useEffect, useState } from 'react'
import "./components.css"

function Profile({accessToken}) {

    const [username, setUsername] = useState()
    const [orgname, setOrgname] = useState()
    const [showToken, setShowToken] = useState(false)

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
        <div className="profileName"><span>Name: </span><span className='userinfo'> {username}</span> </div>
        <div className="profileAff"><span>Department:</span><span className='userinfo'> {orgname}</span> </div>

        <button className='tokenBtn' onClick={() => setShowToken(!showToken)}>{!showToken ? (<span>show Token</span>):(<span>Hide Token</span>)}</button>
        {showToken ? (
          <pre className='wraptoken'>
            {accessToken}
          </pre>
        ) : (null)}
    </div>
  )
}

export default Profile