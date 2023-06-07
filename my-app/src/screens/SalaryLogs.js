import React, {useEffect} from 'react'
import Button from '../components/Button'
import { useNavigate, useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import axios from '../api/axios'
import Loader from '../components/Loader'

const SalaryLogs = (props) => {
const navigate = useNavigate()
  let access_token = sessionStorage.getItem("access_token");
  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };

  const {id} = useParams()
  const {data, isLoading, refetch} = useQuery(["id"], async() =>{
    const response = await axios.get(`/salary/` + id, {headers})
    const value = Object.values(response.data)
    return value
  })
  

   
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='min-h-[80%] min-w-[80%] backdrop-blur-sm rounded-3xl flex flex-col justify-start '>
        <h1 className='text-5xl font-bold mx-6 my-2 text-white mb-6'>Salary</h1>
        
        <table className="min-w-full text-justify text-sm font-bold text-white px-20">
        {isLoading && <Loader />}
            <thead >
              <tr className="font-bold text-3xl text-black">
                <th className='border-2'>Gross Salary</th>
                <th className='border-2'>Net Salary</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && data.length > 0 &&
                 (
                  <tr
                    key={data[0].id}
                    className="hover:bg-gray-600 border-2 hover:ease-in cursor-pointer rounded-lg bg-gray-400"
                  >
                    <td className="text-lg font-semibold">{data[0].gross_salary}</td>
                    <td className="text-lg font-semibold ">{data[0].net_salary}</td>                    
                  </tr>
                )}
            </tbody>
          </table>

        <h1 className='text-5xl font-bold mx-6 my-10 text-red-500 mb-6'>Deduction</h1>
       
        <table className="min-w-full text-justify text-sm font-bold text-white px-20">
        {isLoading && <Loader />}
            <thead >
              <tr className="font-bold text-2xl text-black">
                <th className='border-2'>Pag-ibig</th>
                <th className='border-2'>Philhealth</th>
                <th className='border-2'>SSS</th>
                <th className='border-2'>Tax</th>
                <th className='border-2'>Total Deduction</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && data.length > 0 &&
                 (
                  <tr
                    key={data[1].id}
                    className="hover:bg-gray-600 hover:ease-in cursor-pointer border-2 rounded-lg bg-gray-400"
                  >
                    <td className="text-lg font-semibold">{data[1].pagibig}</td>
                    <td className="text-lg font-semibold ">{data[1].philhealth}</td>   
                    <td className="text-lg font-semibold ">{data[1].sss}</td>                    
                    <td className="text-lg font-semibold ">{data[1].tax}</td>                    
                    <td className="text-lg font-semibold ">{data[1].total_deduction}</td>                    

                  </tr>
                )}
            </tbody>
          </table>
        <div className='w-20 rounded-md flex justify-center bg-red-700 mt-20 py-2'>
          <Button 
          label = "Return"
          onClick={() => {
            refetch()
            navigate("/AdminDashboard/PayrollLog")
          }}
          />
        </div>
      </div>
    </div>
  )
}

export default SalaryLogs