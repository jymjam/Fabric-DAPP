import React, {useRef, useState, useEffect} from 'react'
import axio from "../api/axio"
import auth from './auth.css'

const LOGIN_URL = "/users/login"

function Login() {

    const [username, setUsername] = useState("")
    const [orgname, setOrgname] = useState("")
    const [err, setErr] = useState(null)

    useEffect(() => {
        
    },[])

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
        }catch(err){
            if(!err?.response){ //throws err if server down
                setErr(true)
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
                <label>Org1</label>
                 <input type="radio" name='orgname' value="Org1" onChange={(e) => setOrgname(e.target.value)}/>
                <label>Org2</label>
                 <input type="radio" name='orgname' value="Org2" onChange={(e) => setOrgname(e.target.value)}/>
             </div>
            <button>Login</button>
        </form>
        <p>
            Have an account?
            <span>
                {/*react router will go here*/}
                <a href='#'>Login</a>
            </span>
        </p>
      </section>
    )
}

export default Login