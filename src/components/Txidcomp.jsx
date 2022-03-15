import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './components.css'

function Txidcomp() {

  const location = useLocation()
  const e = location.state

  useEffect(() => {}, [e])

  return (
    <div className='txidC'>
      <h1>Transaction Information</h1>
      <h3>{e.TxId}</h3>
      <ul>
        <ul>
          <li>owner: {e.Value.owner}</li>
          <li>make: {e.Value.make}</li>
        <li>model: {e.Value.model}</li>
        <li>color: {e.Value.colour}</li>
      </ul>
      <li>Time: {e.Timestamp}</li>
      <li>Delete: {e.IsDelete}</li>
      </ul>
    </div>
  )
}

export default Txidcomp