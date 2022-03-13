import React, { useEffect, useState } from 'react'
import axio from '../api/axio'
import AssetHistory from './AssetHistory'
import './components.css'


function QueryCarByID({accessToken}) {

    const [carID, setCarID] = useState("")
    const [ownerName, setOwnerName] = useState("")
    const [err, setErr] = useState(null)
    const [response, setResponse] = useState("")

    //sends auth bearer token for authorized queries
    axio.interceptors.request.use(
        config => {
            config.headers.Authorization = `Bearer ${accessToken}`
            return config
        }, error => {
            return Promise.reject(error)
        }
    )

    useEffect(() => {
        setCarID(carID)
    }, [carID])
    
    const formSubmit = async(e) => {
        e.preventDefault()
        try{
            const response = await axio.post(`/channels/mychannel/chaincodes/fabcar`, {
                fcn: "changeCarOwner",
                peers: ["peer0.org1.example.com","peer0.org2.example.com"],
                chaincodeName:"fabcar",
                channelName: "mychannel",
                args: [carID, ownerName]
            })
            console.log((await response).data.result)
            setResponse(JSON.stringify(response.data.result, null,1))
        }catch(err){
            setErr(true)
            console.error('sumting wong')
        }
    }

  return (
    <div className='home_child_component'>
        <h1>Query Cars By ID</h1>
        <form onSubmit={formSubmit}>
            { err && <h4 className='dangerText'>Something went fong</h4>}
            <input required type='text' placeholder='enter Car ID' onChange={(e) => setCarID(e.target.value)}/>
            <input required type='text' placeholder="New owner's name" onChange={(e) => setOwnerName(e.target.value)}/>
            <button>Query</button>
        </form>
        <div className='display'>
        <pre>
            <h2>{response}</h2>
        </pre>
        <hr/>
        <hr/>
        <pre>
            <AssetHistory carID={carID} accessToken={accessToken}/>
        </pre>
        </div>

    </div>
  )
}

export default QueryCarByID