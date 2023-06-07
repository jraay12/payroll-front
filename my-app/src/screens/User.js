import React, {useEffect} from 'react'
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from '../api/axios';
import Loader from '../components/Loader';
const User = () => {

  let access_token = sessionStorage.getItem("access_token");
  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };
    const navigate = useNavigate()
    const {id} = useParams()
    
    useEffect(() => {
        let access_token = sessionStorage.getItem("access_token");
        if (access_token === "" || access_token === null) {
          navigate("/");
        }
      }, [])

      const {data: getSalary, isLoading} = useQuery(["id"], async() =>{
        const response = await axios.get(`/salary/` + id, {headers})
        const value = Object.values(response.data)
        return value
      },
      {
        refetchInterval: 100,
        staleTime:500,
        cacheTime:100,
        refetchIntervalInBackground:true,
        refetchOnMount:true,
        refetchOnWindowFocus:true
      })


      const {data: User} = useQuery(["name"], async()=>{
        const response = await axios.get(`/getUser` , {headers})
        const value = Object.values(response.data)
        return value[2].name
      },
      {
        refetchInterval: 500,
        cacheTime:100,
        staleTime:500,
        keepPreviousData:false,
        refetchIntervalInBackground:true
      })
      
      

      
  return (
    <div className='flex w-full  min-h-screen bg-background justify-center items-center'>
      <div className='flex flex-col w-[80%] min-h-[70%] bg-gray-400 rounded-2xl'>
      <h1 className='text-3xl mx-4 my-4 font-bold'>{User}</h1>
      <h1 className='text-5xl font-bold mx-6 text-white mb-6'>Salary</h1>

        <table className="w-full text-justify text-white ">
          {isLoading && <Loader />}
            <thead >
              <tr className="text-1xl text-black">
                <th className='border-2 '>Gross Salary</th>
                <th className='border-2'>Net Salary</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(getSalary) && getSalary.length > 0 &&
                 (
                  <tr
                    key={getSalary[0].id}
                    className="hover:bg-gray-600 border-2 hover:ease-in cursor-pointer rounded-lg bg-gray-400"
                  >
                    <td className="text-lg font-semibold">{getSalary[0].gross_salary}</td>
                    <td className="text-lg font-semibold ">{getSalary[0].net_salary}</td>                    
                  </tr>
                )}
            </tbody>
          </table>

        <h1 className='text-5xl font-bold mx-6 my-10 text-red-500 mb-6'>Deduction</h1>
        <table className="min-w-full text-justify text-sm font-bold text-white px-20">
        {isLoading && <Loader />}
            <thead >
              <tr className="font-semibold text-1xl text-black">
                <th className='border-2'>Pag-ibig</th>
                <th className='border-2'>Philhealth</th>
                <th className='border-2'>SSS</th>
                <th className='border-2'>Tax</th>
                <th className='border-2'>Total Deduction</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(getSalary) && getSalary.length > 0 &&
                 (
                  <tr
                    key={getSalary[1].id}
                    className="hover:bg-gray-600 hover:ease-in cursor-pointer border-2 rounded-lg bg-gray-400"
                  >
                    <td className="text-lg font-semibold">{getSalary[1].pagibig}</td>
                    <td className="text-lg font-semibold ">{getSalary[1].philhealth}</td>   
                    <td className="text-lg font-semibold ">{getSalary[1].sss}</td>                    
                    <td className="text-lg font-semibold ">{getSalary[1].tax}</td>                    
                    <td className="text-lg font-semibold ">{getSalary[1].total_deduction}</td>                    

                  </tr>
                )}
            </tbody>
          </table>
      </div>
    </div>
  )
}

export default User