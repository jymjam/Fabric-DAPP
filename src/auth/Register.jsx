import React, {useRef, useState, useEffect} from 'react'

function Register() {

    const [username, setUsername] = useState("")
    const [orgname, setOrgname] = useState("")
    const [err, setErr] = useState("")

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
        console.log(username, orgname)
    }

    return (
      <section>
        <h1>Register</h1>
        <form onSubmit={formSubmit}>
            <input type="text" name='username' placeholder='Enter username' required autoComplete='off' 
                onChange={(e) => setUsername(e.target.value)}
             />
             <div>
                <label>Org1</label>
                 <input type="radio" name='orgname' value="Org1" onChange={(e) => setOrgname(e.target.value)}/>
                <label>Org2</label>
                 <input type="radio" name='orgname' value="Org2" onChange={(e) => setOrgname(e.target.value)}/>
             </div>
            <button>Signup</button>
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

export default Register