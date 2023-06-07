import React, {useEffect} from 'react'
import { useNavigate } from 'react-router';

const User = () => {
    const navigate = useNavigate()
    useEffect(() => {
        let access_token = sessionStorage.getItem("access_token");
        if (access_token === "" || access_token === null) {
          navigate("/");
        }
      }, [])

  return (
    <div className='w-screen h-screen bg-black text-white'>User</div>
  )
}

export default User