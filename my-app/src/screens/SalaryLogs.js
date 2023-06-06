import React from 'react'
import Button from '../components/Button'

const SalaryLogs = (props) => {
  return (
    <div className='absolute top-10  min-h-[80%] min-w-[80%] bg-white  rounded-2xl flex items-end justify-start '>
        <div className='w-20 rounded-md flex justify-center bg-red-700 mx-2 my-4'>
        <button className='text-white' onClick={props.onClick}>Cancel</button>
        </div>
    </div>
  )
}

export default SalaryLogs