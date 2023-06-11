import { useQuery } from '@tanstack/react-query'
import axios from '../api/axios'
import React from 'react'
import { useParams } from 'react-router-dom'
const UserProfile = () => {
    let access_token = sessionStorage.getItem("access_token");
    const headers = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };
    const {id} = useParams()
    
    
    const {data: Profile, isLoading} = useQuery(['id'], async () => {
        const response = await axios.get(`/profile/` + id, {headers})
        const value = Object.values(response)
        return value
    }) 
    
    if(isLoading){
      return <h1>LOADING</h1>
    }
    console.log(Profile)
  return (
    <div className='flex justify-center items-center w-full min-h-screen'>
        <div className='flex flex-col  rounded-3xl bg-white object-cover bg-no-repeat shadow-2xl drop-shadow-2xl w-full mx-40 h-[90%]'>
              <div className='flex flex-col justify-start mx-4 mt-4 gap-2'>
                <h1 className='font-thin text-4xl  '>I'm <span className='text-4xl font-extrabold'>{Profile[0].name}</span></h1>
                <h1 className='text-xl font-thin'>{Profile[0].position}</h1>
                <hr className='border-2'/>
                  <div className='flex flex-col mx-20 gap-2'>
                    <div className='flex gap-32'>
                    <h1 className='mx-4 '>Email</h1>
                    <h1 className='font-extrabold'>{Profile[0].email}</h1>
                    </div>
                    <hr className='border-blue-green border-1'/>
                    <div className='flex gap-12 '>
                    <h1 className='mx-4'>Contact Number</h1>
                    <h1 className='font-extrabold'>{Profile[0].contact_number}</h1>
                    </div>
                    <hr className='border-blue-green border-1'/>
                    <div className='flex gap-[135px]'>
                    <h1 className='mx-4 '>Rate</h1>
                    <h1 className='font-extrabold'>{Profile[0].rate}</h1>
                    </div>
                    <hr className='border-blue-green border-1'/>
                    <div className='flex gap-[125px]'>
                    <h1 className='mx-4 '>Street</h1>
                    <h1 className='font-extrabold'>{Profile[0].address.street}</h1>
                    </div>
                    <hr className='border-blue-green border-1'/>
                    <div className='flex gap-[137px]'> 
                    <h1 className='mx-4 '>City</h1>
                    <h1 className='font-extrabold'>{Profile[0].address.city}</h1>
                    </div>
                    <hr className='border-blue-green border-1'/>
                    <div className='flex gap-[109px]'>
                    <h1 className='mx-4 '>Country</h1>
                    <h1 className='font-extrabold'>{Profile[0].address.country}</h1>
                    </div>
                    <hr className='border-blue-green border-1'/>
                    <div className='flex gap-32'>
                    <h1 className='mx-4 '>State</h1>
                    <h1 className='font-extrabold'>{Profile[0].address.state}</h1>
                    </div>
                    <hr className='border-blue-green border-1'/>
                    <div className='flex gap-[100px]'>
                      <h1 className='mx-4 '>Zip Code</h1>
                      <h1 className='font-extrabold'>{Profile[0].address.zip_code}</h1>
                    </div>
                    <hr className='border-blue-green border-1'/>

                    </div>
                </div>
              </div>           
    </div>
  )
}

export default UserProfile