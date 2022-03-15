import React, { useState, useEffect } from 'react'
import axio from '../api/axio'

function AssetHistory({carID, accessToken}) {

  const format = [
    {
      TxId: "",
            Value: {
                make: "",
                model: "",
                colour: "",
                owner: ""
            },
            Timestamp: "",
            IsDelete: ""
    }
  ]
  
  const [assetHistory, setAssetHistory] = useState(format)
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    // console.log(carID, accessToken, assetHistory, showHistory)
  }, [carID, accessToken, showHistory])

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
      // console.log(...(await response).data.result)
      setAssetHistory(response.data.result)
      console.log("Updated Asset details:", assetHistory)
      setShowHistory(true)
    }catch(err){
      console.error("sum ting ven fong")
      setShowHistory(false)
    }
  }

  const temp = () => {
    console.log(assetHistory)
  }


  return (
    <div>
      <h2>Asset History</h2>
      <button onClick={temp}>test btn</button>
      <button onClick={fetchHistory}>fetct History</button>
        { showHistory && (
          assetHistory.forEach(element => {
            <h1>element</h1>
          })
        )
        }
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