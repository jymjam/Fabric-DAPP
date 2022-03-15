import React, { useState } from 'react'
import axio from '../api/axio'
import './components.css'


function AddCar({accessToken, ownerName}) {

    const [carID, setCarID] = useState("")
    const [ownername, setOwnername] = useState(ownerName)
    const [carInfo, setCarInfo] = useState({
        make: "",
        model:"",
        color:"",
        owner: ownername 
    })
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

    async function formSubmit(e){
        e.preventDefault()
        try{
            const response = await axio.post(`/channels/mychannel/chaincodes/fabcar`, {
                fcn: "createCar",
                peers: ["peer0.org1.example.com","peer0.org2.example.com"],
                chaincodeName:"fabcar",
                channelName: "mychannel",
                args: [carID, carInfo.make, carInfo.model, carInfo.owner]
            })
            console.log(response.data.value)
        }catch(err){
            console.error('sam toong wong wang')
        }
    }

  return (
    <div className='home_child_component'>
        <h1>Add New Car</h1>
        <form onSubmit={formSubmit}>
            { err && <h4 className='dangerText'>Something went fong</h4>}
            <input type='text' placeholder='enter Car ID' onChange={(e) => setCarID(e.target.value)}/>
            <input type='text' placeholder='Car Maker' onChange={(e) => setCarInfo({...carInfo, make: e.target.value})}/>
            <input type='text' placeholder='Car Model' onChange={(e) => setCarInfo({...carInfo, model: e.target.value})}/>
            <input type='text' placeholder='Car color' onChange={(e) => setCarInfo({...carInfo, color: e.target.value})}/>
            <button>Submit</button>
        </form>
        <pre>
            car ID: {carID} ||
            make: {carInfo.make} |
            model: {carInfo.model} |
            color: {carInfo.color} 
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