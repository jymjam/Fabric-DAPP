import React, {useState, useEffect} from 'react'
import {useNavigate } from 'react-router-dom'
import axio from "../api/axio"
import "./auth.css"

const REGISTER_URL = "/users"

function Register() {

    const [username, setUsername] = useState("")
    const [orgname, setOrgname] = useState("")
    const [err, setErr] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        setUsername(username)
    },[username])

    useEffect(() => {
        setOrgname(orgname)
    },[orgname])

    //submits field values
    const formSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await axio.post(REGISTER_URL, {
                username: username,
                orgName: orgname
            })
            console.log(String(response.data.success))
            if ( String(response.data.success) === "false" ){
                setErr(true)
                return;
            }
            setErr(false)
            navigate('/login')
        }catch(err){
            if(!err?.response){ //throws err if server down
                setErr(true)
            }
        }
    }

    return (
      <section className='container'>
        <h1>Register</h1>
        { err && (<h4 className='dangerText'>Registration Failed!</h4>)}
        <form onSubmit={formSubmit}>
            <input type="text" name='username' placeholder='Enter username' required autoComplete='off' 
                onChange={(e) => setUsername(e.target.value)}
             />
             <div>
                 <input type="radio" name='orgname' value="Org1" onChange={(e) => setOrgname(e.target.value)}/>
                <label>Org1</label>
                 <input type="radio" name='orgname' value="Org2" onChange={(e) => setOrgname(e.target.value)}/>
                <label>Org2</label>
             </div>
            <button>Signup</button>
        </form>
        <p>
            Have an account?
            <span>
                <a href='/login'>Login</a>
            </span>
        </p>
      </section>
    )
}

export default Register