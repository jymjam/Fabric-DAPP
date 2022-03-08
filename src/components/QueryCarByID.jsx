import React, { useEffect, useState } from 'react'
import axio from '../api/axio'


function AddCar({accessToken}) {

    const [carID, setCarID] = useState("")
    const [err, setErr] = useState(null)

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
            const response = await axio.get(`/channels/mychannel/chaincodes/fabcar?args=["${carID}"]&peer=peer0.org1.example.com&fcn=queryCar`)
            console.log(response.data)
        }catch(err){
            setErr(true)
            console.error('sumting wong')
        }
    }

  return (
    <div>
        <form onSubmit={formSubmit}>
            { err && <h4>Something went fong</h4>}
            <input type='text' placeholder='enter Car ID' onChange={(e) => setCarID(e.target.value)}/>
            <button>Query</button>
        </form>

    </div>
  )
}

export default AddCar