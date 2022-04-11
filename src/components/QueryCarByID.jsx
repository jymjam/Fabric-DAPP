import React, { useEffect, useState } from 'react'
import axio from '../api/axio'
import './components.css'


function QueryCarByID({accessToken, orgname, hak}) {

    const [carID, setCarID] = useState("")
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
            const response = await axio.get(`/channels/mychannel/chaincodes/fabcar?args=["${carID}"]&hak=${hak}&peer=peer0.org2.example.com&fcn=queryCar`)
            setResponse(JSON.stringify(response.data.result, null,1))
            console.log(response)
        }catch(err){
            setErr(true)
            console.error('sumting wong')
        }
    }

  return (
    <div className='home_child_component'>
        <h1>Find Car</h1>
        <form onSubmit={formSubmit}>
            { err && <h4 className='dangerText'>Something went fong</h4>}
            <input type='text' placeholder='enter Car ID' onChange={(e) => setCarID(e.target.value)}/>
            <button className='homebtn'>Query</button>
        </form>
        <div className='display'>
        <pre>
            <h2>{response}</h2>
            <ol>
            </ol>
        </pre>
        </div>

    </div>
  )
}

export default QueryCarByID