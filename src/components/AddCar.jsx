import React, { useState } from 'react'
import axio from '../api/axio'
import './components.css'

function AddCar({accessToken, ownerName}) {

    const [carID, setCarID] = useState("")
    const [carInfo, setCarInfo] = useState({
        make: "",
        model:"",
        color:"",
        owner: ownerName 
    })
    const [err, setErr] = useState(false)
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

    async function formSubmit(e){
        e.preventDefault()
        try{
            const obj = {
                fcn: "createCar",
                peers: ["peer0.org1.example.com","peer0.org2.example.com"],
                chaincodeName:"fabcar",
                channelName: "mychannel",
                args: [carID, carInfo.make, carInfo.model, carInfo.color, carInfo.owner]
            }
            const response = await axio.post(`/channels/mychannel/chaincodes/fabcar`, JSON.stringify(obj), {headers: {"Content-Type": 'application/json'}})
            console.log(obj)
            console.log(response)
            setErr(!response.data.success)
        }catch(err){
            setErr(true)
            console.error('sam toong wong wang')
        }
    }

  return (
    <div className='home_child_component'>
        <h1>Add New Car</h1>
        <form onSubmit={formSubmit}>
            { err && <h4 className='dangerText'>Something vent fong</h4>}
            <input className='homebtn' type='text' placeholder='enter Car ID' onChange={(e) => setCarID(e.target.value)}/>
            <input className='homebtn' type='text' placeholder='Car Maker' onChange={(e) => setCarInfo({...carInfo, make: e.target.value})}/>
            <input className='homebtn' type='text' placeholder='Car Model' onChange={(e) => setCarInfo({...carInfo, model: e.target.value})}/>
            <input className='homebtn' type='text' placeholder='Car color' onChange={(e) => setCarInfo({...carInfo, color: e.target.value})}/>
            <button className='homebtn'>Submit</button>
        </form>
        <pre>
            [car ID:<span className='addCarInfo'> {carID}</span> # 
            make:<span className='addCarInfo'> {carInfo.make}</span> | 
            model:<span className='addCarInfo'> {carInfo.model}</span> | 
            color:<span className='addCarInfo'> {carInfo.color}</span> ]
        </pre>
        <div className='display'>
        <pre>
            <h2>{response}</h2>
        </pre>
        </div>

    </div>
  )
}

export default AddCar