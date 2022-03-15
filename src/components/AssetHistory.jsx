import React, { useState, useEffect } from 'react'
import axio from '../api/axio'
import './components.css'

function AssetHistory({carID, accessToken}) {

  const format = [
    {
      TxId: "abcdefghijlk",
            Value: {
                make: "make1",
                model: "model1",
                colour: "color1",
                owner: "owner1"
            },
            Timestamp: "today",
            IsDelete: "false"
    },
    {
      TxId: "uvwxyz",
            Value: {
                make: "make2",
                model: "model2",
                colour: "color2",
                owner: "owner2"
            },
            Timestamp: "last month",
            IsDelete: "true"
    }
  ]
  
  const [assetHistory, setAssetHistory] = useState(format)
  const [showHistory, setShowHistory] = useState(false)

  // useEffect(() => {
  //   // console.log(carID, accessToken, assetHistory, showHistory)
  // }, [carID, accessToken, showHistory])

   axio.interceptors.request.use(
        config => {
            config.headers.Authorization = `Bearer ${accessToken}`
            return config
        }, error => {
            return Promise.reject(error)
        }
    )

 const fetchHistory = async(e) => {
   e.preventDefault()
    try{
      const response = await axio.get(`/channels/mychannel/chaincodes/fabcar?args=["sedan"]&peer=peer0.org1.example.com&fcn=getHistoryForAsset`)
      setAssetHistory(response.data.result)
      console.log("Updated Asset details:", assetHistory)
      setShowHistory(true)
    }catch(err){
      console.error("sum ting ven fong")
      setShowHistory(false)
    }
  }

  return (
    <div>
      <h2>Asset History</h2>
      <button onClick={fetchHistory}>fetct History</button>
      <pre>
        <div>
          {
            assetHistory.map(function(e, index){
              return (
            <ul className='historyCard' key={e.TxId}>
              <ul>
                <li>owner: {e.Value.owner}</li>
                <li>owner: {e.Value.make}</li>
              <li>owner: {e.Value.model}</li>
                <li>owner: {e.Value.colour}</li>
              </ul>
              <li>Time: {e.Timestamp}</li>
              <li>Delete: {e.IsDelete}</li>
             <hr/>
             </ul>
              ) 
            })
          }
        </div>
      </pre>
    </div>
  )
}

export default AssetHistory


          // assetHistory.map(e => (
          //   <ul key={e.TxId}>
          //     <ul>
          //       <li>owner: {e.Value.owner}</li>
          //       <li>owner: {e.Value.make}</li>
          //       <li>owner: {e.Value.model}</li>
          //       <li>owner: {e.Value.colour}</li>
          //     </ul>
          //     <li>Time: {e.Timestamp}</li>
          //     <li>Delete: {e.IsDelete}</li>
          //   </ul>
          // ))