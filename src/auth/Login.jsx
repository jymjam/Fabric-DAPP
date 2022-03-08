import React, {useState, useEffect} from 'react'
import axio from "../api/axio"
import auth from './auth.css'
import useAuth from '../api/useAuth'
import {Link, useNavigate, useLocation} from 'react-router-dom'

const LOGIN_URL = "/users/login"

function Login() {

    const {setAuth} = useAuth()
    const navigate = useNavigate()
    // const location = useLocation()
    // const from = location.state?.from?.pathname || "/"

    const [username, setUsername] = useState("")
    const [orgname, setOrgname] = useState("")
    const [err, setErr] = useState(null)

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
            const response = await axio.post(LOGIN_URL, {
                username: username,
                orgName: orgname
            })
            console.log(String(response.data.success))
            if ( String(response.data.success) === "false" ){
                setErr(true)
                return;
            }
            setErr(false)
            const accessToken = response?.data?.message?.token
            setAuth({username, accessToken})
            navigate("/home", {replace: true})
        }catch(err){
            if(!err?.response){ //throws err if server down
                setErr(true)
                console.error('server timed out :(')
            }
        }
    }

    return (
      <section className='container'>
        <h1>Login</h1>
        { err && (<h4>Login Failed!</h4>)}
        <form onSubmit={formSubmit} className="form">
            <input type="text" name='username' placeholder='Enter username' required autoComplete='off' 
                onChange={(e) => setUsername(e.target.value)}
             />
             <div className='radio-div'>
                 <input type="radio" name='orgname' value="Org1" onChange={(e) => setOrgname(e.target.value)}/>
                <label>Org1</label>
                 <input type="radio" name='orgname' value="Org2" onChange={(e) => setOrgname(e.target.value)}/>
                <label>Org2</label>
             </div>
            <button>Login</button>
        </form>
        <p>
            Don't have an account?
            <span>
                {/*react router will go here*/}
                <a href='/register'>Signup</a>
            </span>
        </p>
      </section>
    )
}

export default Login