import React, {useEffect} from 'react'
import { useNavigate, Outlet } from 'react-router';
import UserSlides from "../components/UserSlide"
const UserDashbroad = () => {

    const navigate = useNavigate()
    
    
    useEffect(() => {
        let access_token = sessionStorage.getItem("access_token");
        if (access_token === "" || access_token === null) {
          navigate("/");
        }
      }, [])
     

      
  return (
    <div className='flex min-w-max max-h-screen min-h-screen bg-background'>
        <UserSlides />
        <Outlet />
    </div>
  )
}

export default UserDashbroad