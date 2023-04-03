import React, { useEffect } from 'react'
import AddUser from './AddUser'
import { useNavigate } from 'react-router-dom'
const Admindashboard = () => {
  const usenavigate = useNavigate()
  useEffect(() => {
    let access_token = sessionStorage.getItem('access_token');
    if (access_token === '' || access_token === null){
      usenavigate('/');
    }

  },[]);



  return (
    <div className='w-screen h-screen'>
      <div className='m-auto'><AddUser/></div>
    </div>
  )
}

export default Admindashboard