import React from 'react'
import { Link, useParams } from 'react-router-dom'

function TestThanks() {
    const params = useParams()
  return (
    <div className='flex  justify-center items-center h-screen bg-blue-200'>
        <div className='shadow-2xl rounded-4xl bg-white h-[500px] w-[500px] p-5 flex flex-col space-y-8 justify-center items-center text-center'>
            <span className='font-[Poppins] font-semibold text-2xl'>Thank you for writing the Test</span>
            <span className='font-[Poppins] text-blue-300 font-semibold text-xl'>Your Score : {params.score} out of {params.maxScore}</span>
            <span className='font-[Poppins] font-semibold text-2xl'>Kindly wait a few days for the response from the Employer</span>
            <Link to="/home" className='p-5 font-[Poppins] bg-blue-600 rounded-full text-white cursor-pointer'>Return to Home Page</Link>
        </div>
    </div>
  )
}

export default TestThanks