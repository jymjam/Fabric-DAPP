import React, { useState } from 'react'
import "./components.css"
import Switch from 'react-input-switch'

function Profile({accessToken, orgName, userName, setOrg, switchToggle, setSwitchToggle, setHak }) {

    const [showToken, setShowToken] = useState(false)

  return (
    <div className='home_child_component'>
        <h1>User Profile</h1>
        <div className="profileName"><span>Name:</span><span className='userinfo'> {userName}</span> </div>
        <div className="profileAff"><span>Organization:</span><span className='userinfo'> {orgName}</span> </div>

        <div>
          ⚠ Change Org:
          <label className='switch'>
            <Switch styles={{trackChecked:{backgroundColor: 'peru'}}} value={switchToggle} onChange={() => {
              orgName === 'Org1' ? setOrg('Org2') : setOrg('Org1')
              setHak(true)
              switchToggle === 0 ? setSwitchToggle(1) : setSwitchToggle(0)
            }}/>
          </label>
          {
            switchToggle === 1 ? (
          <p className='dangerText'>⚠ Warning! Chaning organizations without explicit permission may return unauthorized data ❌</p>
            ):(null)
          }
        </div>

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