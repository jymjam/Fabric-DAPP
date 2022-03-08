import React, { useState } from 'react'

function Profile() {

    const [user, setUser] = useState("")
    const [org, setOrg] = useState("")

  return (
    <div>
        <h1>Welcome</h1>
        <h4>{user}</h4>
        <h5>{org}</h5>
    </div>
  )
}

export default Profile