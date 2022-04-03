import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axio from '../api/axio'
import './components.css'

function AssetHistory({carID, accessToken}) {

  const format = [
    {
      TxId: null,
            Value: {
                make: "make1",
                model: "model1",
                colour: "color1",
                owner: "owner1"
            },
            Timestamp: "today",
            IsDelete: "false"
    },
  ]
  
  const navigate = useNavigate()
  const [carid, setCarid] = useState(carID)
  const [assetHistory, setAssetHistory] = useState(format)

    useEffect(() => {}, [carid])
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
      const response = await axio.get(`/channels/mychannel/chaincodes/fabcar?args=["${carid}"]&peer=peer0.org1.example.com&fcn=getHistoryForAsset`)
      setAssetHistory(response.data.result)
      console.log("Updated Asset details:", assetHistory)
    }catch(err){
      console.error("sum ting ven fong")
    }
  }

  return (
    <div>
      <h2>Asset History</h2>
      <input type="text" placeholder='Enter asset name' onChange={ e => setCarid(e.target.value)}/>
      <button className='homebtn' onClick={fetchHistory}>fetct History</button>
      <pre>
        <div>
        { carid && (<p>Showing results for: {carid}</p>)}
          { assetHistory[0].TxId? (
            assetHistory.map(function(e, index){
              return (
                <div onClick={() => {navigate(`/home/${e.TxId}`, {state: e})}} className='historyCard' key={e.TxId}>
              <ul >
                <ul>
                  <li>owner: {e.Value.owner}</li>
                  <li>make: {e.Value.make}</li>
                <li>model: {e.Value.model}</li>
                <li>color: {e.Value.colour}</li>
              </ul>
              <li>Time: {e.Timestamp}</li>
              <li>Delete: {e.IsDelete}</li>
             <hr/>
             </ul>
            </div>
              ) 
            })
          ):(null)
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