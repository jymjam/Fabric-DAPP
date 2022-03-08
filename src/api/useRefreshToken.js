import axio from "../api/axio"
import useAuth from "./useAuth"

function useRefreshToken() {
  
    const {setAuth} = useAuth()
    const refresh = async() => {
        const response = await axio.get('/refresh', {
            withCredentials: true //allows sending cookies in the response.
        })
        setAuth(prev => {
            console.log(JSON.stringify(prev))
            console.log(response.data)
            return { ...prev, accessToken: response.data.message.token}
        })
        return response.data.message.token
    }
    return refresh
}

export default useRefreshToken