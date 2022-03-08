import React, { useEffect, useState } from 'react'

function Profile({accessToken}) {

    const [username, setUsername] = useState()
    const [orgname, setOrgname] = useState()

  function parseJWT(token){
    try{
      return JSON.parse(atob(token.split('.')[1]))
    }catch(err){
      console.error(err)
    }
  }

  useEffect(() => {
    const decodedJWT = parseJWT(accessToken)
    setUsername(decodedJWT.username)
    setOrgname(decodedJWT.orgName)
  }, [])

  return (
    <div>
        <h1>User Profile</h1>
        <div><p>Name: </p><p>{username}</p></div>
        <div><p>Affiliation:</p> <p>{orgname}</p></div>
    </div>
  )
}

export default Profile